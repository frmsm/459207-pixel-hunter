import {checkQuestion, getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {gameRender, shouldLevelRender} from "./game-render";
import {PIXEL_HUNTER, setLives} from "./data/game";
import {curStats} from "./current-stats";
import {createTimer} from "./timer";

const tmp = (state) => `<header class="header">
    ${backButton}
    ${gameHeader(state)}
  </header>
  <section class="game">
    <p class="game__task">${PIXEL_HUNTER[state.level].question}</p>
    <form class="game__content game__content--wide">
      ${gameRender(PIXEL_HUNTER[state.level], `705`, `455`)}
    </form>
    ${curStats(state.answers)}
  </section>`;

export const renderGameTwo = (state) => {
  const gameTwo = getElementFromTemplate(tmp(state));

  const gameContent = gameTwo.querySelector(`.game__content`);
  const questionOne = gameTwo.querySelectorAll(`[name='question1']`);

  const answers = PIXEL_HUNTER[state.level].answers;

  gameContent.addEventListener(`click`, () => {
    const q1 = checkQuestion(questionOne);
    if (q1) {
      clearInterval(timer);
      if (q1 === answers[0].type) {
        shouldLevelRender(state, Number(gameTimer.innerHTML));
      } else {
        shouldLevelRender(state, -1, setLives(state.lives - 1));
      }
    }
  });

  const goBackButton = gameTwo.querySelector(`.back`);
  goBackButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    clearInterval(timer);
    showGreetings();
  });

  selectScreen(gameTwo);

  const gameTimer = gameTwo.querySelector(`.game__timer`);
  const timer = createTimer(gameTimer, state);
};


