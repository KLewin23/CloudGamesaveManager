import {
    TOGGLE_DIALOG,
} from '../types';

export function toggleDialog(state) {
    return {
        type: TOGGLE_DIALOG,
        payload: state,
    };
}