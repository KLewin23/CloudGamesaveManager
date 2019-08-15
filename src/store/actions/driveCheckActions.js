import {
    ADD_MESSAGE, CHANGE_STAGE
} from '../types';

export const addDriveCheckMessage = payload => ({
    type: ADD_MESSAGE,
    payload
})

// export const changeStage = payload => ({
//     type: CHANGE_STAGE,
//     payload
// })