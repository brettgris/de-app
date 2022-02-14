import { AnyAction } from 'redux';
import { ADD_SCORE, RESET_SCORE } from '../actions/score';

const scoreReducer = function(state: number = 0, action: AnyAction) {
    switch(action.type) {
        case ADD_SCORE:
            return state + 1;
        case RESET_SCORE:
            return 0;
        default:
            return state;
    }
}

export default scoreReducer;