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

export const gameRender = (level, width, height) => {
  return `
      ${level.answers.map((it, i) => {
    const img = new Image();
    //let im = ``;
    img.onload = function () {
      console.log(this);
      const naturalSize = {width: this.width, height: this.height};
      const resolution = resize({width, height}, naturalSize);
      this.width = resolution.width;
      this.height = resolution.height;
      console.log(resolution.height, 1111);
      // im = `<img src=${this.src} alt="Option ${i + 1}" width=${this.width} height=${this.height}>`;
      return level.photoPaint
        ? `<div class="game__option">
              <img src=${this.src} alt="Option ${i + 1}" width=${this.width} height=${this.height}>
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
              <img src=${()=>this.src} alt="Option ${i + 1}" width=${this.width} height=${this.height}>
              </div>`;
    };
    img.src = it.img;
    // img.alt = `Option ${i + 1}`;
    // console.log(im);
  }).join(``)}`;
};
