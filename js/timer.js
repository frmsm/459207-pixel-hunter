import {setLives} from "./data/game";
import {shouldLevelRender} from "./game-render";

export const createTimer = (timerElement, state) => {
  const timer = setInterval((() => {
    timerElement.textContent--;
    if (Number(timerElement.textContent) < 6) {
      timerElement.style.color = `red`;
      setTimeout(() => {
        timerElement.style.color = `black`;
      }, 500);
    }
    if (timerElement.textContent === `0`) {
      clearInterval(timer);
      shouldLevelRender(state, -1, setLives(state.lives - 1));
    }
  }), 1000);
  return timer;
};
