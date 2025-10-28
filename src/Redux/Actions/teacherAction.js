import { fetchClasses } from "./classAction";

// Action Types
export const FETCH_TEACHERS_REQUEST = 'FETCH_TEACHERS_REQUEST';
export const FETCH_TEACHERS_SUCCESS = 'FETCH_TEACHERS_SUCCESS';
export const FETCH_TEACHERS_FAIL = 'FETCH_TEACHERS_FAIL';

export const CREATE_TEACHER_REQUEST = 'CREATE_TEACHER_REQUEST';
export const CREATE_TEACHER_SUCCESS = 'CREATE_TEACHER_SUCCESS';
export const CREATE_TEACHER_FAIL = 'CREATE_TEACHER_FAIL';

export const ASSIGN_TEACHER_REQUEST = "ASSIGN_TEACHER_REQUEST";
export const ASSIGN_TEACHER_SUCCESS = "ASSIGN_TEACHER_SUCCESS";
export const ASSIGN_TEACHER_FAIL = "ASSIGN_TEACHER_FAIL";

export const REMOVE_TEACHER_REQUEST = "REMOVE_TEACHER_REQUEST";
export const REMOVE_TEACHER_SUCCESS = "REMOVE_TEACHER_SUCCESS";
export const REMOVE_TEACHER_FAIL = "REMOVE_TEACHER_FAIL";

export const DELETE_TEACHER_REQUEST = "DELETE_TEACHER_REQUEST";
export const DELETE_TEACHER_SUCCESS = "DELETE_TEACHER_SUCCESS";
export const DELETE_TEACHER_FAIL = "DELETE_TEACHER_FAIL";

// for teacher
export const FETCH_MY_CLASSES_REQUEST = "FETCH_MY_CLASSES_REQUEST";
export const FETCH_MY_CLASSES_SUCCESS = "FETCH_MY_CLASSES_SUCCESS";
export const FETCH_MY_CLASSES_FAIL = "FETCH_MY_CLASSES_FAIL"

// API Base URL
const host = "https://school-management-system-mern-mu.vercel.app"; // Ya apna backend URL

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

// Fetch All Teachers

export const fetchAllTeachers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_TEACHERS_REQUEST });

        // Token Redux store se le lo

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(`${host}/api/v1/teachers/getTeachers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Proper Bearer token bheja
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.msg || "Failed to fetch teachers");
        }

        dispatch({
            type: FETCH_TEACHERS_SUCCESS,
            payload: data.teachers,
        });
    } catch (error) {
        dispatch({
            type: FETCH_TEACHERS_FAIL,
            payload: error.message,
        });
    }
};



// Create Teacher
export const createTeacher = (teacherData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_TEACHER_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please login again.");

        const response = await fetch(`${host}/api/v1/teachers/createTeacher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(teacherData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create teacher");
        }

        dispatch({
            type: CREATE_TEACHER_SUCCESS,
            payload: data,
        });

        // Refresh teachers list after creation
        dispatch(fetchAllTeachers());
    } catch (error) {
        dispatch({
            type: CREATE_TEACHER_FAIL,
            payload: error.message,
        });
    }
};


// Action types


// Assign Teacher To Class
export const assignTeacherToClass = (teacherId, classId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ASSIGN_TEACHER_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        const response = await fetch(`${host}/api/v1/teachers/assignTeacherToClass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ teacherId, classId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || data.message || "Failed to assign teacher to class");
        }

        dispatch({
            type: ASSIGN_TEACHER_SUCCESS,
            payload: data.msg || "successfully Assigned Teacher To Class",
        });
        // Return message so frontend pop-up dikha sake
        return data.msg || "successfully Assigned Teacher To Class";

    } catch (error) {
        dispatch({
            type: ASSIGN_TEACHER_FAIL,
            payload: error.message,
        });
    }
};


// remove student from class
export const removeTeacherFromClass = (classId, teacherId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_TEACHER_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        const response = await fetch(`${host}/api/v1/teachers/removeTeacherFromClass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ classId, teacherId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to remove teacher");
        }

        dispatch({
            type: REMOVE_TEACHER_SUCCESS,
            payload: data.message,
        });

        // Refresh classes after removal
        dispatch(fetchClasses());
    } catch (error) {
        dispatch({
            type: REMOVE_TEACHER_FAIL,
            payload: error.message,
        });
    }
};



//  Delete Teacher Action (using fetch + JWT)
export const deleteTeacher = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_TEACHER_REQUEST });

        const token = getToken(getState);
        if (!token) throw new Error("No token found. Please log in again.");

        // Make DELETE request with token
        const response = await fetch(`${host}/api/v1/teachers/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // authentication
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete teacher");
        }

        dispatch({
            type: DELETE_TEACHER_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_TEACHER_FAIL,
            payload: error.message,
        });
    }
};


export const fetchMyClassesWithStudents = () => { return async (dispatch, getState) => {
        try {
            dispatch({ type: FETCH_MY_CLASSES_REQUEST });

            const token = getToken(getState);
            if (!token) throw new Error("No token found. Please log in again.");

            const response = await fetch(`${host}/api/v1/teachers/my-Classes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch classes");
            }

            dispatch({
                type: FETCH_MY_CLASSES_SUCCESS,
                payload: data.data, 
            });

            return {
                success: true,
                message: data.message,
                data: data.data,
            };

        } catch (error) {
            const errorMsg = error.message || "Error fetching classes";

            dispatch({
                type: FETCH_MY_CLASSES_FAIL,
                payload: errorMsg,
            });

            return {
                success: false,
                message: errorMsg,
            };
        }
    };
};
