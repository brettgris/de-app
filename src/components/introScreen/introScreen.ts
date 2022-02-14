import { dispatchPageChange, PageType } from '../../actions/page';
import './introScreen.scss';

class IntroScreen {
    el: Element | null;
    root: Element | null;

    constructor() {
        this.el = null;
        this.root = null;
    }

    mount(el: Element | null) {
        if (el) {
            this.root = document.createElement('div');
            this.root.classList.add('introscreen');
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

            const heading = document.createElement('h1');
            heading.textContent = 'TriviaMaster';
            
            const copy = document.createElement('div');
            copy.textContent = 'Be the first to get all the answers right.';

            const btn = document.createElement('button');
            btn.textContent = 'Start game';
            btn.type = 'button';
            btn.classList.add('styled');
            btn.addEventListener('click', this.handleBtnClick);

            this.root.append(heading);
            this.root.append(copy);
            this.root.append(btn);
        }
    }

    handleBtnClick() {
        dispatchPageChange(PageType.GAME_SCREEN);
    }
}

export default IntroScreen;