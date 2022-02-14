import store from "../store";

export const INTRO_SCREEN = 'INTRO_SCREEN';
export const GAME_SCREEN = 'GAME_SCREEN';
export const RESULTS_SCREEN = 'RESULTS_SCREEN';

export const PAGE_CHANGE = 'PAGE_CHANGE';

export enum PageType {
    INTRO_SCREEN, GAME_SCREEN, RESULTS_SCREEN
};

export const dispatchPageChange = (payload: PageType) => {
    store.dispatch({ type: PAGE_CHANGE, payload: payload});
}