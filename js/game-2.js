import {checkQuestion, getElementFromTemplate, selectScreen} from "./utils";
import {showGameThree} from "./game-3";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {gameRender} from "./game-render";
import {PIXEL_HUNTER} from "./data/game";

const tmp = `<header class="header">
    ${backButton}
    ${gameHeader}
  </header>
  ${gameRender(PIXEL_HUNTER[`level-2`])}`;

const gameTwo = getElementFromTemplate(tmp);

export const showGameTwo = () => {
  selectScreen(gameTwo);
};

const gameContent = gameTwo.querySelector(`.game__content`);
const questionOne = gameTwo.querySelectorAll(`[name='question1']`);

gameContent.addEventListener(`click`, () => {
  const q1 = checkQuestion(questionOne);
  if (q1) {
    // console.log(q1);
    showGameThree();
  }
});

const goBackButton = gameTwo.querySelector(`.back`);
goBackButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  showGreetings();
});

