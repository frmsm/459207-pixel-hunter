import {getElementFromTemplate, checkQuestion, selectScreen} from "./utils";
import {showGameTwo} from "./game-2";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {PIXEL_HUNTER} from "./data/game";
import {gameRender} from "./game-render";

const tmp = (level) => `<header class="header">
    ${backButton}
    ${gameHeader}
  </header>
  ${gameRender(level)}`;

// const gameOne = (level) = getElementFromTemplate(tmp(level));

const gameOne = getElementFromTemplate(tmp(PIXEL_HUNTER[`level-1`]));

export const showGameOne = () => {
  selectScreen(gameOne);
};

const gameContent = gameOne.querySelector(`.game__content`);

const questionOne = gameOne.querySelectorAll(`[name=question1]`);
const questionTwo = gameOne.querySelectorAll(`[name=question2]`);

gameContent.addEventListener(`click`, () => {
  const q1 = checkQuestion(questionOne);
  const q2 = checkQuestion(questionTwo);
  if (q1 && q2) {
    // console.log(q1 + ` ` + q2);
    showGameTwo();
  }
});

const goBackButton = gameOne.querySelector(`.back`);
goBackButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  showGreetings();
});

