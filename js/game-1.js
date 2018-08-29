import {getElementFromTemplate, checkQuestion, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {PIXEL_HUNTER, setLives} from "./data/game";
import {gameRender, shouldLevelRender} from "./game-render";
import {curStats} from "./current-stats";
import {createTimer} from "./timer";

const tmp = (state) => `<header class="header">
    ${backButton}
    ${gameHeader(state)}
  </header>
  <section class="game">
    <p class="game__task">${PIXEL_HUNTER[state.level].question}</p>
    <form class="game__content">
      ${gameRender(PIXEL_HUNTER[state.level], `468`, `458`)}
    </form>
    ${curStats(state.answers)}
  </section>`;

// const gameOne = (level) = getElementFromTemplate(tmp(level));
export const renderGameOne = (state) => {
  const gameOne = getElementFromTemplate(tmp(state));
  const gameContent = gameOne.querySelector(`.game__content`);

  const questionOne = gameOne.querySelectorAll(`[name=question1]`);
  const questionTwo = gameOne.querySelectorAll(`[name=question2]`);

  gameContent.addEventListener(`click`, () => {
    const q1 = checkQuestion(questionOne);
    const q2 = checkQuestion(questionTwo);
    const answers = PIXEL_HUNTER[state.level].answers;
    if (q1 && q2) {
      clearTimeout(timer);
      if (q1 === answers[0].type && q2 === answers[1].type) {
        shouldLevelRender(state, Number(gameTimer.innerHTML));
      } else {
        shouldLevelRender(state, -1, setLives(state.lives));
      }
    }
  });

  const goBackButton = gameOne.querySelector(`.back`);
  goBackButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    clearInterval(timer);
    showGreetings();
  });

  selectScreen(gameOne);

  const gameTimer = gameOne.querySelector(`.game__timer`);
  const timer = createTimer(gameTimer, state);
};


