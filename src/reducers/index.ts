import { combineReducers } from 'redux';
import pageReducer from './page';
import questionReducer from './questions';
import scoreReducer from './score';
import urgentReducer from './urgent';

export default combineReducers({
    page: pageReducer,
    questions: questionReducer,
    score: scoreReducer,
    urgent: urgentReducer
});
