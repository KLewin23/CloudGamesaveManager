import {
    TOGGLE_FULLSCREEN,
    TOGGLE_USER_STATUS,
    SEND_USER_EMAIL,
    SEND_LOCATION
} from '../types';

export const toggleFullscreen = payload => ({
    type: TOGGLE_FULLSCREEN,
    payload
})

export const toggleUserStatus = payload => ({
    type: TOGGLE_USER_STATUS,
    payload
})

export const sendUserEmail = payload => ({
        type: SEND_USER_EMAIL,
        payload
})

export const sendLocation = payload => ({
        type: SEND_LOCATION,
        payload
})