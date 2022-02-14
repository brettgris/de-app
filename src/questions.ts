import { QuestionType } from "./reducers/questions";

const questions: Array<QuestionType> = [
    {
        question: 'Is the correct answer is A?',
        multi: false,
        choices: ['A', 'B', 'C', 'D'],
        answers: ['A']
    }, {
        question: 'Is the correct answer is B & C?',
        multi: true,
        choices: ['A', 'B', 'C', 'D'],
        answers: ['B', 'C']
    }, {
        question: 'Is the correct answer is D?',
        multi: true,
        choices: ['A', 'B', 'C', 'D'],
        answers: ['D']
    }, {
        question: 'Is the correct answer is C?',
        multi: false,
        choices: ['A', 'B', 'C', 'D'],
        answers: ['C']
    }
];

export default questions;