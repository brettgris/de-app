import { AnyAction } from "redux";
import questions from "../questions";

export interface QuestionType {
    question: string;
    multi: boolean;
    choices: Array<string>;
    answers: Array<string>;
}

const questionReducer = (state: Array<QuestionType> = questions, action: AnyAction) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default questionReducer;