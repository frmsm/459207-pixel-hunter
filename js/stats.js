import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {RESUTS} from "./data/game";
import {curStats} from "./current-stats";
import {countAnswers, countScores} from "./data/scores";

const renderScoreType = (score, count, type) => {
  if (type === `answer`) {
    return `</td>
        <td class="result__points">× 100</td>
        <td class="result__total">${score}</td>
      </tr>`;
  }

  const scoreType = {
    'fast': `Бонус за скорость:`,
    'slow': `Штраф за медлительность`,
    'lives': `Бонус за жизни:`
  };

  const styleType = {
    'fast': `stats__result--fast`,
    'slow': `stats__result--slow`,
    'lives': `stats__result--alive`
  };

  return score > 0
    ? `<tr>
      <td></td>
      <td class="result__extra">${scoreType[type]}</td>
      <td class="result__extra">${count} <span class="stats__result ${styleType[type]}"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${score}</td>
    </tr>`
    : ``;
};

const results = (result) => {
  return `${result.reverse().map((it, i)=>{
    const score = countScores(it);
    return `<tr>
    <td class="result__number">${++i}.</td>
      <td colspan="2">
        ${curStats(it.answers)}   
      </td>
      ${score === -1
    ? `<td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>`
    : `${renderScoreType(score.answer, it.answer, `answer`)}
        ${renderScoreType(score.fast, it.fast, `fast`)}
          ${renderScoreType(score.lives, it.lives, `lives`)}
          ${renderScoreType(score.slow, it.slow, `slow`)}
          <tr>
        <td colspan="5" class="result__total  result__total--final">${score.total}</td>
      </tr>`}
    </tr>`;
  })
  }`;
};

const tmp = (result, lives) => `<header class="header">
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
    <h2 class="result__title">${lives < 0 ? `FAIL` : `Победа`}</h2>
    <table class="result__table">
    ${results(result)}
    </table>
  </section>`;


export const showStats = (state) => {
  const statistic = countAnswers(state);
  RESUTS.push(statistic);
  const stats = getElementFromTemplate(tmp(RESUTS, state.lives));
  selectScreen(stats);

  const backButton = stats.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    showGreetings();
  });
};

