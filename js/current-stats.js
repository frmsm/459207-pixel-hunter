export const curStats = (answers) => {
  return `<ul class="stats">
  ${answers.map((it) => {
    if (it === -1) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    } if (it > 20) {
      return `<li class="stats__result stats__result--slow"></li>`;
    } else if (it < 10) {
      return `<li class="stats__result stats__result--fast"></li>`;
    } else if (it > 10 && it < 20) {
      return `<li class="stats__result stats__result--correct"></li>`;
    }
    return `<li class="stats__result stats__result--unknown"></li>`;
  }).join(``)}
  ${new Array(10 - answers.length)
  .fill(`<li class="stats__result stats__result--unknown"></li>`)
  .join(``)}
  </ul>`;
};
