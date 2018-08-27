import {curStats} from "./current-stats";
import {INITIAL_STATE} from "./data/game";

export const setQuestionStyle = (lvl) => {
  const answersLength = lvl.answers.length;
  switch (answersLength) {
    case 3:
      return {style: `game__content--triple`, width: `304`, height: `455`};
    case 1:
      return {style: `game__content--wide`, width: `705`, height: `455`};
    default:
      return {style: ``, width: `468`, height: `458`};
  }
};

export const gameRender = (level) => {
  const style = setQuestionStyle(level);
  return `
<section class="game">
    <p class="game__task">${level.question}</p>
    <form class="game__content ${style.style}">
      ${level.answers.map((it, i) => {
    return level.photoPaint
      ? `<div class="game__option">
              <img src=${it} alt="Option ${i + 1}" width=${style.width} height=${style.height}>
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
              <img src=${it} alt="Option ${i + 1}" width=${style.width} height=${style.height}>
              </div>`;
  }).join(``)}
    </form>
    ${curStats(INITIAL_STATE.answers)}
  </section>`;
};


