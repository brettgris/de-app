import { PageType, PAGE_CHANGE } from '../actions/page';
import { AnyAction } from 'redux';

const pageReducer = function(state: PageType = PageType.INTRO_SCREEN, action: AnyAction) {
    switch(action.type) {
        case PAGE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export default pageReducer;