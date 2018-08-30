import {ANSWERS_COUNT, FAST_ANSWER_TIME, SLOW_ANSWER_TIME} from "./data/game";

export const curStats = (answers) => {
  return `<ul class="stats">
  ${answers.map((it) => {
    if (it === -1) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }
    if (it < SLOW_ANSWER_TIME) {
      return `<li class="stats__result stats__result--slow"></li>`;
    }
    if (it > FAST_ANSWER_TIME) {
      return `<li class="stats__result stats__result--fast"></li>`;
    }
    if (it > SLOW_ANSWER_TIME && it < FAST_ANSWER_TIME) {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
    return `<li class="stats__result stats__result--unknown"></li>`;
  }).join(``)}
  ${new Array(ANSWERS_COUNT - answers.length)
  .fill(`<li class="stats__result stats__result--unknown"></li>`)
  .join(``)}
  </ul>`;
};

