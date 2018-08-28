import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader, startTimer} from "./game-header";
import {gameRender, shouldLevelRender} from "./game-render";
import {INITIAL_STATE, PIXEL_HUNTER, setLives} from "./data/game";
import {curStats} from "./current-stats";

const tmp = (state) => `<header class="header">
    ${backButton}
    ${gameHeader(state)}
  </header>
  <section class="game">
    <p class="game__task">${PIXEL_HUNTER[state.level].question}</p>
    <form class="game__content game__content--triple">
      ${gameRender(PIXEL_HUNTER[state.level], `304`, `455`)}
    </form>
    ${curStats(state.answers)}
  </section>`;

// Я удалил game__option--selected из вёрстки за ненадобностью

export const renderGameThree = (state) => {
  const gameThree = getElementFromTemplate(tmp(state));

  const gameContent = gameThree.querySelector(`.game__content`);

  gameContent.addEventListener(`click`, (e) => {
    //console.log(e.t)
    if (e.target.closest(`.game__option`)) {
      e.target.closest(`.game__option`).classList.add(`game__option--selected`);
      shouldLevelRender(state, Number(gameTimer.innerHTML));
      clearInterval(timer);
    }
  });

  const goBackButton = gameThree.querySelector(`.back`);
  goBackButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    showGreetings();
  });

  selectScreen(gameThree);

  const gameTimer = gameThree.querySelector(`.game__timer`);
  // startTimer(gameTimer, state);
  const timer = setInterval((() => {
    console.log(gameTimer.innerHTML);
    gameTimer.innerHTML--;
    if (Number(gameTimer.innerHTML) < 6) {
      gameTimer.style.color = `red`;
      setTimeout(()=>{
        gameTimer.style.color = `black`;
      }, 500);
    }
    if (gameTimer.innerHTML === `0`) {
      clearInterval(timer);
      shouldLevelRender(state, -1, setLives(state.lives));
    }
  }), 1000);
}
