import TriviaGame from "./components/triviaGame/triviaGame";

import './styles/global.scss';

const el: Element | null = document.querySelector("#root");
const game = new TriviaGame();
game.mount(el);
