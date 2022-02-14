import store from "../store";

export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const dispatchAddScore = () => {
    store.dispatch({ type: ADD_SCORE });
}

export const dispatchResetScore = () => {
    store.dispatch({ type: RESET_SCORE });
}