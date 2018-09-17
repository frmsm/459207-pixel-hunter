import {ANSWERS_COUNT, AnswerTime} from "../../data/game";

export const currentStats = (answers) => {
  return `<ul class="stats">
  ${answers.map((it) => {
    if (it === -1) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }
    if (it <= AnswerTime.SLOW) {
      return `<li class="stats__result stats__result--slow"></li>`;
    }
    if (it >= AnswerTime.FAST) {
      return `<li class="stats__result stats__result--fast"></li>`;
    }
    if (it > AnswerTime.SLOW && it < AnswerTime.FAST) {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
    return `<li class="stats__result stats__result--unknown"></li>`;
  }).join(``)}
  ${new Array(ANSWERS_COUNT - answers.length)
  .fill(`<li class="stats__result stats__result--unknown"></li>`)
  .join(``)}
  </ul>`;
};

