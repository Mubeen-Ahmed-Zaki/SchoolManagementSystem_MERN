import {
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  FETCH_TEACHERS_FAIL,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_FAIL,
  ASSIGN_TEACHER_REQUEST,
  ASSIGN_TEACHER_SUCCESS,
  ASSIGN_TEACHER_FAIL,
  REMOVE_TEACHER_REQUEST,
  REMOVE_TEACHER_SUCCESS,
  REMOVE_TEACHER_FAIL,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAIL,
  // for teacher
  FETCH_MY_CLASSES_REQUEST,
  FETCH_MY_CLASSES_SUCCESS,
  FETCH_MY_CLASSES_FAIL,
} from '../Actions/teacherAction';

const initialState = {
  teachers: [],
  loading: false,
  error: null,
  success: false
};

const initialState1 = {
  teacher: null,
  classes: [],
  loading: false,
  error: null,
  message: ""
};


export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch All Teachers
    case FETCH_TEACHERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, loading: false, teachers: action.payload };
    case FETCH_TEACHERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Create Teacher
    case CREATE_TEACHER_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CREATE_TEACHER_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case CREATE_TEACHER_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };

    // Assign Teachers to Class
    case ASSIGN_TEACHER_REQUEST:
      return { ...state, loading: true, success: false };
    case ASSIGN_TEACHER_SUCCESS:
      return { ...state, loading: false, success: true, message: action.payload.message };
    case ASSIGN_TEACHER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Remove Teachers to Class
    case REMOVE_TEACHER_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case REMOVE_TEACHER_SUCCESS:
      return { ...state, loading: false, success: true, message: action.payload, };
    case REMOVE_TEACHER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete teacher
    case DELETE_TEACHER_REQUEST:
      return { loading: true };
    case DELETE_TEACHER_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case DELETE_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const teacherClassReducer = (state = initialState1, action) => {
  switch (action.type) {
    case FETCH_MY_CLASSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ""
      };

    case FETCH_MY_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        teacher: action.payload.teacher,
        classes: action.payload.classes,
        error: null,
        message: "Classes fetched successfully"
      };

    case FETCH_MY_CLASSES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: action.payload
      };

    default:
      return state;
  }
};
