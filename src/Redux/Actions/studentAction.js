export const FETCH_STUDENTS_REQUEST = "FETCH_STUDENTS_REQUEST";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILURE = "FETCH_STUDENTS_FAILURE";

export const CREATE_STUDENT_REQUEST = "CREATE_STUDENT_REQUEST";
export const CREATE_STUDENT_SUCCESS = "CREATE_STUDENT_SUCCESS";
export const CREATE_STUDENT_FAILURE = "CREATE_STUDENT_FAILURE";

export const ASSIGN_STUDENT_REQUEST = "ASSIGN_STUDENT_REQUEST";
export const ASSIGN_STUDENT_SUCCESS = "ASSIGN_STUDENT_SUCCESS";
export const ASSIGN_STUDENT_FAIL = "ASSIGN_STUDENT_FAIL";

export const DELETE_STUDENT_REQUEST = "DELETE_STUDENT_REQUEST";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
export const DELETE_STUDENT_FAILURE = "DELETE_STUDENT_FAILURE";

export const REMOVE_STUDENT_REQUEST = "REMOVE_STUDENT_REQUEST";
export const REMOVE_STUDENT_SUCCESS = "REMOVE_STUDENT_SUCCESS";
export const REMOVE_STUDENT_FAILURE = "REMOVE_STUDENT_FAILURE";

// student check the enrolled class
export const FETCH_ENROLLED_CLASS_REQUEST = "FETCH_ENROLLED_CLASS_REQUEST";
export const FETCH_ENROLLED_CLASS_SUCCESS = "FETCH_ENROLLED_CLASS_SUCCESS";
export const FETCH_ENROLLED_CLASS_FAIL = "FETCH_ENROLLED_CLASS_FAIL";


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

const host = "https://school-management-system-mern-mu.vercel.app"; // apna backend URL


//  fetch all students
export const fetchAllStudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_STUDENTS_REQUEST });

        // Get token from Redux (auth reducer)
        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please login again.");

        // Setup headers
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        // Fetch API call
        const response = await fetch(`${host}/api/v1/students`, {
            method: "GET",
            headers,
        });

        const data = await response.json();
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch students");
        }

        dispatch({
            type: FETCH_STUDENTS_SUCCESS,
            payload: data.data, // backend me data.data array hai
        });
    } catch (error) {
        dispatch({
            type: FETCH_STUDENTS_FAILURE,
            payload: error.message,
        });
    }
};


// create student
export const createStudent = (studentData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_STUDENT_REQUEST });

        // Get user token from Redux state
        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please login again.");

        // Headers with token
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        // Fetch call
        const response = await fetch(`${host}/api/v1/students/createStudent`, {
            method: "POST",
            headers,
            body: JSON.stringify(studentData),
        });

        const data = await response.json();
        // Handle errors
        if (!response.ok) {
            throw new Error(data.message || "Failed to add student");
        }


        dispatch({
            type: CREATE_STUDENT_SUCCESS,
            payload: data.data
        });
        return Promise.resolve({
            status: data.status,
            message: data.message,
            data: data.data
        });

    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;

        dispatch({
            type: CREATE_STUDENT_FAILURE,
            payload: errorMsg
        });

        // Error bhi promise ke through return karo
        return Promise.resolve({
            status: "error",
            message: errorMsg
        });;
    }
};


// assigned student to calss
export const assignStudentToClass = (studentId, classId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ASSIGN_STUDENT_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        const response = await fetch(`${host}/api/v1/students/assignedStudentToClass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ studentId, classId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to assign student");
        }

        dispatch({
            type: ASSIGN_STUDENT_SUCCESS,
            payload: data.data, // actual assigned student data
        });

        return {
            success: true,
            message: data.message || "Student assigned successfully!",
            data: data.data,
        };
    } catch (error) {
        const errorMsg = error.message || "Error assigning student";

        dispatch({
            type: ASSIGN_STUDENT_FAIL,
            payload: errorMsg,
        });

        return {
            success: false,
            message: errorMsg,
        };
    }
};


// delete student
export const deleteStudent = (studentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_STUDENT_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        const response = await fetch(`${host}/api/v1/students/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ studentId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete student");
        }

        dispatch({
            type: DELETE_STUDENT_SUCCESS,
            payload: studentId, // we only need ID for removing from list
        });

        return {
            success: true,
            message: data.message || "Student deleted successfully",
        };
    } catch (error) {
        const errorMsg = error.message || "Error deleting student";

        dispatch({
            type: DELETE_STUDENT_FAILURE,
            payload: errorMsg,
        });

        return {
            success: false,
            message: errorMsg,
        };
    }
};


// remove student from class
export const removeStudentFromClass = ( classId, studentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_STUDENT_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        const response = await fetch(`${host}/api/v1/students/removedStudentFromClass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ classId, studentId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to remove student from class");
        }

        dispatch({
            type: REMOVE_STUDENT_SUCCESS,
            payload: data.data, // updated student
        });

        return {
            success: true,
            message: data.message || "Student removed from class successfully!",
            data: data.data,
        };

    } catch (error) {
        const errorMsg = error.message || "Error removing student from class";

        dispatch({
            type: REMOVE_STUDENT_FAILURE,
            payload: errorMsg,
        });

        // return {
        //     success: false,
        //     message: errorMsg,
        // };
    }
};

// fetch My Enrolled Class
export const fetchMyEnrolledClass = () => { return async (dispatch, getState) => {
        try {
            dispatch({ type: FETCH_ENROLLED_CLASS_REQUEST });

            const token = getToken(getState);
            if (!token) {
                throw new Error("No token found. Please log in again.");
            }

            const response = await fetch(`${host}/api/v1/students/my-enrolled-class`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            console.log("Backend Response:", data); // Debug

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch enrolled class");
            }

            dispatch({
                type: FETCH_ENROLLED_CLASS_SUCCESS,
                payload: data.data,
            });

            return {
                success: true,
                message: data.message,
                data: data.data,
            };

        } catch (error) {
            const errorMsg = error.message || "Error fetching enrolled class";

            dispatch({
                type: FETCH_ENROLLED_CLASS_FAIL,
                payload: errorMsg,
            });

            return {
                success: false,
                message: errorMsg,
            };
        }
    };
};
