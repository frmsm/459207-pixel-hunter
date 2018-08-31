import {PIXEL_HUNTER, setLevel} from "./data/game";
import {renderGameTwo} from "./game-2";
import {renderGameThree} from "./game-3";
import {renderGameOne} from "./game-1";
import {showStats} from "./stats";
import {resize} from "./data/resize";

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

export const addImages = (images, state, frame) => {
  [...images].forEach((it, i) => {
    const img = new Image();
    img.addEventListener(`load`, function () {
      const naturalSize = {width: img.width, height: img.height};
      const resolution = resize(frame, naturalSize);
      img.width = resolution.width;
      img.height = resolution.height;
      it.appendChild(img);
    });
    img.src = PIXEL_HUNTER[state.level].answers[i].img;
    img.alt = `Option ${i + 1}`;
  });
};

export const firstLevelRender = (state) => {
  setQuestionStyle(state);
};

export const shouldLevelRender = (state, answer = -1, lives = state.lives) => {
  const newState = Object.assign({}, state,
      {level: setLevel(state.level + 1),
        answers: [...state.answers, answer],
        lives});
  if (newState.level && newState.lives > -1) {
    setQuestionStyle(newState);
  } else {
    showStats(newState);
  }
};

export const gameRender = (level) => {
  return `
    ${level.answers.map((it, i) => {
    return level.photoPaint
      ? `<div class="game__option">      
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
         </div>`;
  }).join(``)}`;
};
