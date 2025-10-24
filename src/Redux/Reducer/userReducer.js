import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
} from "../Actions/userAction";

const initialState = {
    users: [],
    loading: false,
    userProfile: null,
    success: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, loading: false, userProfile: action.payload };
        case FETCH_PROFILE_FAIL:
            return { ...state, loading: false, error: action.payload };

        // update
        case UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true, success: false };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, loading: false, success: true, userInfo: action.payload };
        case UPDATE_PROFILE_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };

        // fetchAllUsers
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case FETCH_USERS_FAIL:
            return { ...state, loading: false, users: [], error: action.payload };

        // role update
        case UPDATE_ROLE_REQUEST:
            return { ...state, loading: true, success: false, error: null };
        case UPDATE_ROLE_SUCCESS:
            return { ...state, loading: false, success: true, message: action.payload };
        case UPDATE_ROLE_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
