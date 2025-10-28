// -------------------------------------

// Action Types
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAIL = "FETCH_PROFILE_FAIL";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";

export const UPDATE_ROLE_REQUEST = "UPDATE_ROLE_REQUEST";
export const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_FAIL = "UPDATE_ROLE_FAIL";

const host = "https://school-management-system-mern-mu.vercel.app";

/* Helper: safely extract token */
const getToken = (getState) => {
  try {
    const {
      auth: { userInfo },
    } = getState();
    return userInfo?.token || localStorage.getItem("token");
  } catch {
    return localStorage.getItem("token");
  }
};

/* Fetch Logged-in User Profile */
export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    const token = getToken(getState);
    if (!token) throw new Error("No token found. Please login again.");

    const res = await fetch(`${host}/api/v1/auth/viewProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to fetch profile");

    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

/* Update Logged-in User Profile */
// export const updateProfile = (userData) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });
//     const token = getToken(getState);
//     if (!token) throw new Error("No token found. Please login again.");

//     const res = await fetch(`${host}/api/v1/auth/updateProfile`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(userData),
//     });

//     const data = await res.json();
//     console.log("Backend response (updateProfile):", data);

//     if (!res.ok) throw new Error(data.msg || "Failed to update profile");

//     dispatch({
//       type: UPDATE_PROFILE_SUCCESS,
//       payload: data.user,
//     });


//   } catch (error) {
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.message,
//     });
//   }
// };

export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    const token = getToken(getState);
    if (!token) throw new Error("No token found. Please login again.");

    const res = await fetch(`${host}/api/v1/auth/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log("Backend response (updateProfile):", data);

    if (data.status !== "success") throw new Error(data.msg || "Update failed");

    const updatedUser = {
      ...getState().auth.userInfo,
      username: data.username,
      email: data.email,
      role: data.role,
    };

    // Update Redux state
    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: updatedUser,
    });

    // Update localStorage so Topbar instantly refreshes
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.message,
    });
  }
};


/* Fetch All Users (Admin only) */
export const fetchAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });
    const token = getToken(getState);
    if (!token) throw new Error("No token found. Please login again.");

    const res = await fetch(`${host}/api/v1/auth/admin/viewAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to fetch users");

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: data.users || [],
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload: error.message,
    });
  }
};

// Update user role (Admin only)
export const updateUserRole = (userId, role) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_ROLE_REQUEST" });

    const token = getState().auth.userInfo?.token || localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please login again.");

    const res = await fetch(`${host}/api/v1/auth/rolechange`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, role }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || data.message || "Failed to update user role");

    dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.msg || "Role updated successfully", });
    return data.msg || "Role updated successfully";
  } catch (error) {
    dispatch({ type: UPDATE_ROLE_FAIL, payload: error.message });
  }
};



