import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {checkScores, RESUTS} from "./data/game";
import {curStats} from "./current-stats";

const checkFastAnswers = (answers) => {
  const count = answers.reduce((sum, answer) => {
    if (answer > 20) {
      return sum + 1;
    }
    return sum;
  }, 0);

  return count > 0 ?
    `
      <tr>
        <td></td>
  <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${count} <span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${count * 50}</td>
    </tr>`
    : ``;
};

const checkLives = (lives) => {
  return lives > 0
    ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${lives * 50}</td>
      </tr>
  `
    : ``;
};

const checkSlowAnswers = (answers) => {
  const count = answers.reduce((sum, answer) => {
    if (answer < 10 && answer > -1) {
      return sum + 1;
    }
    return sum;
  }, 0);

  return count > 0
    ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${count} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-${count * 50}</td>
      </tr>`
    : ``;
};

const checkAnswers = (answers) => {
  const count = answers.reduce((sum, answer) => {
    if (answer > -1) {
      return sum + 1;
    }
    return sum;
  }, 0);

  return `</td>
        <td class="result__points">× 100</td>
        <td class="result__total">${count * 100}</td>
      </tr>`;
}

const results = (result, score, lives) => {
  return `${result.map((it, i)=>{
    return `<tr>
    <td class="result__number">${++i}.</td>
      <td colspan="2">
        ${curStats(it)}   
      </td>
      ${score === -1
    ? `<td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>`
    : `${checkAnswers(it)}
    ${checkFastAnswers(it)}
          ${checkLives(lives)}
          ${checkSlowAnswers(it)}
          <tr>
        <td colspan="5" class="result__total  result__total--final">${score}</td>
      </tr>`}
    </tr>`;
  })
  }`;
};

const tmp = (result, score, lives) => `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="result">
    <h2 class="result__title">${score < 0 ? `FAIL` : `Победа`}</h2>
    <table class="result__table">
    ${results(result, score, lives)}
    </table>
  </section>`;


export const showStats = (state) => {
  RESUTS.push(state.answers);
  const score = checkScores(state.answers, state.lives);

  const stats = getElementFromTemplate(tmp(RESUTS, score, state.lives));


  if (score < 0) {

  }
  selectScreen(stats);


  const backButton = stats.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    showGreetings();
  });
};
// export default stats;
