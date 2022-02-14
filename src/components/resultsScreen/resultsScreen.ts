import { dispatchPageChange, INTRO_SCREEN, PageType } from '../../actions/page';
import { dispatchResetScore } from '../../actions/score';
import store from '../../store';
import ResultsIMG from '../../images/resultsPlaceholder.png';
import { QuestionType } from '../../reducers/questions';

import './resultsScreen.scss';

class ResultsScreen {
    el: Element | null;
    root: Element | null;
    questions: Array<QuestionType>;
    score: number;
    topScore: string;

    constructor() {
        this.el = null;
        this.root = null;
        this.questions = [];
        this.score = 0;
        this.topScore = '';
    }

    mount(el: Element | null) {
        if (el) {
            this.root = document.createElement('div');
            this.root.classList.add('resultsscreen');
            el.append(this.root);
            
            this.score = store.getState().score || 0;
            this.questions = store.getState().questions || [];
            this.checkTopScore();

            this.render();
        }  
    }

    unmount() {
        if (this.el && this.root) {
            this.el.removeChild(this.root);
        }
    }

    render() {
        if (this.root) {
            const img = document.createElement('img');
            img.alt = 'Trivia Results';
            img.src = ResultsIMG;
            this.root.append(img);

            const heading = document.createElement('h1');
            heading.textContent = this.score > 0 ? 'You\'re a Trivia Master!' : 'Better Luck Next Time!';
            this.root.append(heading);

            const score = document.createElement('div');
            score.textContent = `You got ${this.score} out of ${this.questions.length} question right!`; 
            this.root.append(score);

            if (this.topScore) {
                const top = document.createElement('div');
                top.textContent = this.topScore;
                top.classList.add('top-score')
                this.root.append(top);
            }

            const btn = document.createElement('button');
            btn.textContent = 'Play again!';
            btn.type = 'button';
            btn.classList.add('styled');
            btn.addEventListener('click', this.handleBtnClick);
            this.root.append(btn);
        }
    }

    checkTopScore = () => {
        const correct = Number(localStorage.getItem('triviaScore'));
        if (correct && correct > 0) {
            const total = Number(localStorage.getItem('triviaTotal'));
            const date = localStorage.getItem('triviaDate');

            const topPerc = correct/total;
            const curPerc = this.score/this.questions.length;

            if (topPerc > curPerc) {
                this.topScore = `Your best score so far was ${correct} out of ${total} questions which you got on ${date}.`
            } else if (topPerc === curPerc) {
                this.topScore = `This ties your top score of ${correct} out of ${total} questions which you got on ${date}.`
            } else {
                this.topScore = `Congratulations, this is your top score.`;

                localStorage.setItem('triviaScore', `${this.score}`);
                localStorage.setItem('triviaTotal', `${this.questions.length}`);

                const date = new Date();
                localStorage.setItem('triviaDate', new Date().toLocaleDateString('en-US'));
            }
        } else {
            this.topScore = this.score > 0 ? `Congratulations, this is your top score.` : '';

            localStorage.setItem('triviaScore', `${this.score}`);
            localStorage.setItem('triviaTotal', `${this.questions.length}`);

            const date = new Date();
            localStorage.setItem('triviaDate', new Date().toLocaleDateString('en-US'));
        }
    }

    handleBtnClick = () => {
        dispatchResetScore();
        dispatchPageChange(PageType.INTRO_SCREEN);
    }
}

export default ResultsScreen;