import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {addImages, gameRender, shouldLevelRender} from "./game-render";
import {PIXEL_HUNTER, setLives} from "./data/game";
import {curStats} from "./current-stats";
import {createTimer} from "./timer";

const tmp = (state) => `<header class="header">
    ${backButton}
    ${gameHeader(state)}
  </header>
  <section class="game">
    <p class="game__task">${PIXEL_HUNTER[state.level].question}</p>
    <form class="game__content game__content--triple">
      ${gameRender(PIXEL_HUNTER[state.level])}
    </form>
    ${curStats(state.answers)}
  </section>`;

export const renderGameThree = (state) => {
  const frame = {
    width: 304,
    height: 455
  };

  const gameThree = getElementFromTemplate(tmp(state));

  const gameContent = gameThree.querySelector(`.game__content`);

  const images = gameThree.querySelectorAll(`.game__option`);
  addImages(images, state, frame);

  gameContent.addEventListener(`click`, (e) => {
    const gameOption = e.target.closest(`.game__option`);
    if (gameOption) {
      gameOption.classList.add(`game__option--selected`);
      const imgIndex = gameOption.firstElementChild.alt.substr(-1, 1) - 1;
      clearInterval(timer);
      if (PIXEL_HUNTER[state.level].answers[imgIndex].type) {
        shouldLevelRender(state, Number(gameTimer.innerHTML));
      } else {
        shouldLevelRender(state, -1, setLives(state.lives - 1));
      }
    }
  });

  const goBackButton = gameThree.querySelector(`.back`);
  goBackButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    clearInterval(timer);
    showGreetings();
  });

  selectScreen(gameThree);

  const gameTimer = gameThree.querySelector(`.game__timer`);
  const timer = createTimer(gameTimer, state);
};
