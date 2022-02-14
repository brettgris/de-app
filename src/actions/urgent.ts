import store from "../store";

export const URGENT_CHANGE = 'URGENT_CHANGE';

export const dispatchUrgentChange = (payload: boolean) => {
    store.dispatch({ type: URGENT_CHANGE, payload: payload});
}