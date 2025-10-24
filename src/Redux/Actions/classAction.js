// src/redux/actions/classActions.js
export const FETCH_CLASSES_REQUEST = "FETCH_CLASSES_REQUEST";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAIL = "FETCH_CLASSES_FAIL";

export const CREATE_CLASS_REQUEST = "CREATE_CLASS_REQUEST";
export const CREATE_CLASS_SUCCESS = "CREATE_CLASS_SUCCESS";
export const CREATE_CLASS_FAIL = "CREATE_CLASS_FAIL";

export const UPDATE_CLASS_REQUEST = "UPDATE_CLASS_REQUEST";
export const UPDATE_CLASS_SUCCESS = "UPDATE_CLASS_SUCCESS";
export const UPDATE_CLASS_FAIL = "UPDATE_CLASS_FAIL";

export const DELETE_CLASS_REQUEST = "DELETE_CLASS_REQUEST";
export const DELETE_CLASS_SUCCESS = "DELETE_CLASS_SUCCESS";
export const DELETE_CLASS_FAIL = "DELETE_CLASS_FAIL";

const host = "http://localhost:7000";

// Helper → Get token
const getToken = (getState) => {
  const { auth } = getState();
  return auth?.userInfo?.token || localStorage.getItem("token");
};

// ============================ FETCH ALL CLASSES ============================
export const fetchClasses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_CLASSES_REQUEST });

    const token = getToken(getState);

    const res = await fetch(`${host}/api/v1/classes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch classes");
    }

    const data = await res.json();

    dispatch({
      type: FETCH_CLASSES_SUCCESS,
      payload: data.data, // assuming backend sends { data: [...] }
    });
  } catch (error) {
    dispatch({
      type: FETCH_CLASSES_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};

// ============================ CREATE CLASS ============================
export const createClass = (classData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CLASS_REQUEST });

    const token = getToken(getState);

    const res = await fetch(`${host}/api/v1/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create class");
    }

    const data = await res.json();

    dispatch({
      type: CREATE_CLASS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CLASS_FAIL,
      payload: error.message,
    });
  }
};

// ============================ UPDATE CLASS ============================
export const updateClass = (id, updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_CLASS_REQUEST });

    const token = getToken(getState);

    const res = await fetch(`${host}/api/v1/classes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to update class");
    }

    const data = await res.json();

    dispatch({
      type: UPDATE_CLASS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CLASS_FAIL,
      payload: error.message,
    });
  }
};

// ============================ DELETE CLASS ============================
export const deleteClass = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CLASS_REQUEST });

    const token = getToken(getState);

    const res = await fetch(`${host}/api/v1/classes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete class");
    }

    const data = await res.json();

    dispatch({
      type: DELETE_CLASS_SUCCESS,
      payload: id,
    });

    alert(data.msg || "Class deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_CLASS_FAIL,
      payload: error.message,
    });
  }
};
