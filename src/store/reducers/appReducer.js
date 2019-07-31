import {
    TOGGLE_FULLSCREEN,
    TOGGLE_USER_STATUS,
    SEND_USER_EMAIL,
    SEND_LOCATION,
    SAVEOS,
    GETDRIVES,
    SETLAUNCHERS
} from "../types";

const initialState = {
    fullscreen: 0,
    loggedIn: 0,
    email: "",
    id: "",
    location: "Home",
    os: "",
    drives: {},
    launchers: {status: "empty", programs: []}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FULLSCREEN:
            if (state.fullscreen === 1) {
                return {
                    ...state,
                    fullscreen: 0
                };
            } else {
                return {
                    ...state,
                    fullscreen: 1
                };
            }
        case TOGGLE_USER_STATUS:
            if (state.loggedIn === 1) {
                return {
                    ...state,
                    loggedIn: 0
                };
            } else {
                return {
                    ...state,
                    loggedIn: 1
                };
            }
        case SEND_USER_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case SEND_LOCATION:
            return {
                ...state,
                location: action.payload
            };
        case SAVEOS:
            return {
                ...state,
                os: action.payload
            };
        case GETDRIVES:
            return {
                ...state,
                drives: action.payload
            };
        case SETLAUNCHERS:
            return {
                ...state,
                launchers: action.payload
            };
        default:
            return initialState;
    }
};
