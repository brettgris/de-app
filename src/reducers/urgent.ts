import { AnyAction } from 'redux';
import { URGENT_CHANGE } from '../actions/urgent';

const urgentReducer = function(state: boolean = false, action: AnyAction) {
    switch(action.type) {
        case URGENT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export default urgentReducer;