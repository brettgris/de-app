import store from '../../store';
import { PageType } from '../../actions/page';
import IntroScreen from '../introScreen/introScreen';
import GameScreen from '../gameScreen/gameScreen';
import ResultsScreen from '../resultsScreen/resultsScreen';

import './triviaGame.scss';

class TriviaGame {
    page: PageType;
    urgent: boolean;
    el: Element | null;
    root: Element | null;

    constructor() {
        this.page = store.getState().page;
        this.urgent = store.getState().urgent;
        this.el = null;
        this.root = null;
        store.subscribe(this.handleStoreUpdate);
    }

    handleStoreUpdate = () => {
        const { page, urgent } = store.getState();

        if (page !== this.page) {
            this.page = page;
            this.render();
        }

        if (page !== this.urgent) {
            this.urgent = urgent;
            this.handleUrgent();
        }
    }

    mount(el: Element | null) {
        if (el) {
            this.root = document.createElement('div');
            this.root.classList.add('game');
            el.append(this.root);
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
            this.root.innerHTML = '';

            const el = (() => {
                switch(this.page) {
                    case PageType.RESULTS_SCREEN:
                        return new ResultsScreen();
                    case PageType.GAME_SCREEN:
                        return new GameScreen();
                    default:
                        return new IntroScreen();
                }
            })();

            const wrapper = document.createElement('div');
            wrapper.classList.add('game__wrapper');
            this.root.append(wrapper);

            el.mount(wrapper);
        }
    }

    handleUrgent = () => {
        if (this.urgent) {
            if(this.root) this.root.classList.add('urgent');
        } else {
            if(this.root) this.root.classList.remove('urgent');
        }
    }
}

export default TriviaGame;