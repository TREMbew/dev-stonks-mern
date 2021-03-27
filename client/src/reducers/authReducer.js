import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_REQUEST,
    LOGIN_REQUEST,
} from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return { ...state, isAuthenticated: true, loading: false, user: payload };
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return { ...state, ...payload, isAuthenticated: true, loading: false };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return { ...state, loading: false };
        case LOGOUT:
            localStorage.removeItem("token");
            return { token: null, isAuthenticated: false, loading: false , user: null};
        default:
            return state;
    }
}