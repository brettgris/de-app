import { dispatchPageChange, PageType } from '../../actions/page';
import { dispatchAddScore } from '../../actions/score';
import { dispatchUrgentChange } from '../../actions/urgent';
import { QuestionType } from '../../reducers/questions';
import store from '../../store';

import "./gameScreen.scss";

class GameScreen {
    el: Element | null;
    root: Element | null;
    questionID: number;
    questions: Array<QuestionType>;
    showAnswer: boolean;
    selected: Array<boolean>;
    correct: boolean;
    time: number;
    to: ReturnType<typeof setTimeout> | null;
    timerEl: Element | null;
    btn: HTMLButtonElement | null;
    correctClasses: Array<string>;

    constructor() {
        this.el = null;
        this.root = null;
        this.questionID = 0;
        this.questions = [];
        this.showAnswer = false;
        this.selected = [];
        this.correct = false;
        this.time = 15;
        this.to = null;
        this.timerEl = null;
        this.btn = null;
        this.correctClasses = [];
    }

    mount(el: Element | null) {
        if (el) {
            this.root = document.createElement('div');
            this.root.classList.add('gamescreen');
            el.append(this.root);
            this.questions = store.getState().questions || [];
            this.render();
            this.to = setTimeout(this.handleTimer, 1000);
        }  
    }

    unmount() {
        if (this.el && this.root) {
            this.el.removeChild(this.root);
        }
    }

    render() {
        if (this.root) {
            this.root.innerHTML = '';

            const headerWrapper = document.createElement('div');
            headerWrapper.classList.add('header-wrapper');
            this.root.append(headerWrapper);

            //Heading
            const heading = document.createElement('h1');
            heading.textContent = `Question ${this.questionID + 1} of ${this.questions.length}`;
            headerWrapper.append(heading);

            //Timer
            if (!this.showAnswer) {
                this.timerEl = document.createElement('div');
                this.timerEl.textContent = `00:${this.time >= 10 ? this.time : '0'+this.time}`;
                this.timerEl.classList.add('timer');
                headerWrapper.append(this.timerEl);
            }
            
            const { choices, multi, question } = this.questions[this.questionID];

            //Fieldset
            const fieldset = document.createElement('fieldset');
            this.root.append(fieldset);

            //Question
            const legend = document.createElement('legend');
            legend.textContent = question;
            fieldset.append(legend);

            //Selection
            if (multi) {
                const helper = document.createElement('div');
                helper.textContent = 'Select all that apply';
                helper.classList.add('helper-text')
                fieldset.append(helper);
            }

            const choiceWrapper = document.createElement('div');
            choiceWrapper.classList.add('gamescreen__choices');
            fieldset.append(choiceWrapper);

            choices.forEach((choice, i) => {
                const choiceEl = document.createElement('label');
    
                const input = document.createElement('input');
                input.type = multi ? 'checkbox' : 'radio';
                input.name = `question-${this.questionID};`;
                input.addEventListener('change', (evt) => this.handleChoiceChange(evt, i, multi));
                input.checked = multi ? this.selected[i] : this.selected.indexOf(true) === i;
                input.disabled = this.showAnswer;
                if (this.showAnswer && this.correctClasses[i]) {
                    choiceEl.classList.add(this.correctClasses[i]);
                }
                choiceEl.append(input);
    
                const span = document.createElement('span');
                span.textContent = choice;
                choiceEl.append(span);
    
                choiceWrapper.append(choiceEl);
            });

            //Status
            if (this.showAnswer) {
                const status = document.createElement('div');
                status.textContent = (this.correct) ? 'You got it correct' : 'Not quite right';
                status.classList.add('status');
                status.classList.add(this.correct ? 'status--correct' : 'status--wrong')
                this.root.append(status);
            }

            //Button
            const btnEl = document.createElement('div');
            btnEl.classList.add('button-wrapper');

            this.btn = document.createElement('button');
            this.btn.type = 'button';
            this.btn.classList.add('styled')
            
            if (this.showAnswer) {
                this.btn.textContent = (this.questionID < this.questions.length - 1) ? 'Next Question' : 'See Results';
                this.btn.addEventListener('click', this.handleNext);
                this.btn.disabled = false;
            } else {
                this.btn.textContent = 'Submit';
                this.btn.addEventListener('click', this.handleSubmit);
                this.btn.disabled = multi ? !this.selected.includes(true) : this.selected.length < 1;
            }

            btnEl.append(this.btn);
            this.root.append(btnEl);
        }
    }

    handleChoiceChange = (evt: Event, id: number, multi: boolean) => {
        if (multi) {
            const target = evt.target as HTMLInputElement;
            this.selected[id] = target ? target.checked : false;
        } else {
            this.selected = [];
            this.selected[id] = true;
        }
        if (this.btn) this.btn.disabled = !this.selected.includes(true);
    }

    handleNext = () => {
        if (this.questionID < this.questions.length - 1) {
            this.questionID ++;
            this.resetQuestion();
            this.render();
        } else {
            dispatchPageChange(PageType.RESULTS_SCREEN);
        }    
    }

    handleSubmit = () => {
        if (this.to) clearTimeout(this.to);

        const { answers, choices, multi } = this.questions[this.questionID];
        if (multi) {
            this.correct = true;
            choices.forEach((v, i) => {
                const selected = this.selected[i] || false;
                const answer = answers.includes(v);
                const correct = answer === selected;
                if (selected) {
                    this.correctClasses[i] = correct ? 'correct' : 'wrong';
                }

                if (answer && !selected) {
                    this.correctClasses[i] = 'correct';
                }

                if (this.correct && !correct) {
                    this.correct = false;
                }
            });
        } else {
            const id = this.selected.indexOf(true);
            this.correct = (id !== null && choices[id] === answers[0]);
            if (this.correct) {
                this.correctClasses[id] = 'correct';
            } else {
                this.correctClasses[id] = 'wrong';
                const c = choices.indexOf(answers[0]);
                this.correctClasses[c] = 'correct';
            }
        }

        if (this.correct) {
            dispatchAddScore();
        }

        this.showAnswer = true;
        this.render();
    }

    resetQuestion = () => {
        this.showAnswer = false;
        this.selected = [];
        this.correct = false;
        this.time = 15;
        this.correctClasses = [];
        if (this.to) clearTimeout(this.to);
        this.to = setTimeout(this.handleTimer, 1000);
    }

    handleTimer = () => {
        this.time--;
        if (this.timerEl) this.timerEl.textContent = `00:${this.time >= 10 ? this.time : '0'+this.time}`;
        
        if (this.time > 0) {
            if (this.to) clearTimeout(this.to);
            this.to = setTimeout(this.handleTimer, 1000);

            if (this.time === 5) this.handleCountdownAlert();
        } else {
            this.handleSubmit();
            dispatchUrgentChange(false);
        }
    }

    handleCountdownAlert = () => {
        dispatchUrgentChange(true);
    }
}

export default GameScreen;