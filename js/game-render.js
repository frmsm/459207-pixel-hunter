import {curStats} from "./current-stats";
import {INITIAL_STATE, PIXEL_HUNTER, setLevel, setLives} from "./data/game";
import {gameTwo, renderGameTwo} from "./game-2";
import {gameThree, renderGameThree} from "./game-3";
import {renderGameOne} from "./game-1";
import {showGreetings} from "./greeting";
import {showStats} from "./stats";

export const setQuestionStyle = (state) => {
  const answersLength = PIXEL_HUNTER[state.level].answers.length;
  switch (answersLength) {
    case 3:
      renderGameThree(state);
      break;
    case 1:
      renderGameTwo(state);
      break;
    default:
      renderGameOne(state);
      break;
  }
};

export const shouldLevelRender = (state, answer = -1, lives = state.lives) => {
  console.log(lives);
  const newState = Object.assign({}, state,
      {level: setLevel(state.level),
        answers: [...state.answers, answer],
        lives});
  if (newState.level && newState.lives > -1) {
    setQuestionStyle(newState);
  } else {
    showStats(newState);
  }
};

export const gameRender = (level, width, height) => {
  return `
      ${level.answers.map((it, i) => {
    return level.photoPaint
      ? `<div class="game__option">
              <img src=${it.img} alt="Option ${i + 1}" width=${width} height=${height}>
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`
      : `<div class="game__option">
              <img src=${it.img} alt="Option ${i + 1}" width=${width} height=${height}>
              </div>`;
  }).join(``)}`;
};
