import {
    FETCH_CLASSES_REQUEST,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAIL,
    CREATE_CLASS_REQUEST,
    CREATE_CLASS_SUCCESS,
    CREATE_CLASS_FAIL,
    UPDATE_CLASS_REQUEST,
    UPDATE_CLASS_SUCCESS,
    UPDATE_CLASS_FAIL,
    DELETE_CLASS_REQUEST,
    DELETE_CLASS_SUCCESS,
    DELETE_CLASS_FAIL
} from "../Actions/classAction";

const initialState = {
    classes: [],
    loading: false,
    error: null,
};

// export const classReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_CLASSES_REQUEST:
//             return { ...state, loading: true, error: null };

//         case FETCH_CLASSES_SUCCESS:
//             return { ...state, loading: false, classes: action.payload };

//         case FETCH_CLASSES_FAIL:
//             return { ...state, loading: false, error: action.payload };

//         default:
//             return state;
//     }
// };

// -----------------------------------------------------------------//

export const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLASSES_REQUEST:
        case CREATE_CLASS_REQUEST:
            return { ...state, loading: true };

        case FETCH_CLASSES_SUCCESS:
            return { ...state, loading: false, classes: action.payload };

        case CREATE_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                classes: [action.payload, ...state.classes], // new class add at top
            };

        case FETCH_CLASSES_FAIL:
        case CREATE_CLASS_FAIL:
            return { ...state, loading: false, error: action.payload };


        case UPDATE_CLASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };
        case UPDATE_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            };
        case UPDATE_CLASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // Delete Class
        case DELETE_CLASS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };
        case DELETE_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            };
        case DELETE_CLASS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        default:
            return state;
    }
};

