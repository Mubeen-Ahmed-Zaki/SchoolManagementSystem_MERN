import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    CREATE_STUDENT_REQUEST,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAILURE,
    ASSIGN_STUDENT_REQUEST,
    ASSIGN_STUDENT_SUCCESS,
    ASSIGN_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
    REMOVE_STUDENT_REQUEST,
    REMOVE_STUDENT_SUCCESS,
    REMOVE_STUDENT_FAILURE,
    FETCH_ENROLLED_CLASS_REQUEST,
    FETCH_ENROLLED_CLASS_SUCCESS,
    FETCH_ENROLLED_CLASS_FAIL,
} from "../Actions/studentAction";

const initialState = {
    students: [],
    loading: false,
    error: null,
    success: false,
    message: ""
};

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_REQUEST:
        case CREATE_STUDENT_REQUEST:
            return { ...state, loading: true, error: null
            };

        case FETCH_STUDENTS_SUCCESS:
            return { ...state, loading: false, students: action.payload, error: null
            };

        case CREATE_STUDENT_SUCCESS:
            return { ...state, loading: false, students: [...state.students, action.payload], error: null
            };

        case FETCH_STUDENTS_FAILURE:
        case CREATE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload
            };

        //  assign stident to class
        case ASSIGN_STUDENT_REQUEST:
            return { ...state, loading: true, error: null, success: false, message: ""
            };
        case ASSIGN_STUDENT_SUCCESS:
            return { ...state, loading: false,
                students: state.students.map(student =>
                    student._id === action.payload._id ? action.payload : student
                ),
                error: null,
                success: true,
                message: "Student assigned to class successfully"
            };
        case ASSIGN_STUDENT_FAIL:
            return { ...state, loading: false, error: action.payload, success: false, message: action.payload
            };

        // delete a student
        case DELETE_STUDENT_REQUEST:
            return { ...state, loading: true };
        case DELETE_STUDENT_SUCCESS:
            return { ...state, loading: false,
                students: state.students.filter((student) => student._id !== action.payload),
            };
        case DELETE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload };


        // remove student from class
        case REMOVE_STUDENT_REQUEST:
            return { ...state, loading: true };
        case REMOVE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                students: state.students.map((student) =>
                    student._id === action.payload._id ? action.payload : student
                ),
            };
        case REMOVE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};


// student Enrolled Class
const initialState1 = {
    student: null,
    enrolledClass: null,
    loading: false,
    error: null,
    message: ""
};

export const studentEnrolledClassReducer = (state = initialState1, action) => {
    switch (action.type) {
        case FETCH_ENROLLED_CLASS_REQUEST:
            return { ...state, loading: true, error: null, message: "" };

        case FETCH_ENROLLED_CLASS_SUCCESS:
            return { ...state, loading: false, student: action.payload.student, enrolledClass: action.payload.enrolledClass, error: null, message: "Class fetched successfully"
            };

        case FETCH_ENROLLED_CLASS_FAIL:
            return { ...state, loading: false, error: action.payload, message: action.payload
            };

        default:
            return state;
    }
};
