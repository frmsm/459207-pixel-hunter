import {currentStats} from "./levels/current-stats";
import AbstractView from "./abstract-view";
import BackButton from "./header/back-button-view";
import {RIGHT_ANSWER_MULTIPLIER, TYPE_MULTIPLIER} from "../data/game";

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    this.backBtn = new BackButton(()=>this.back());
  }

  renderScoreType(score, count, type) {
    if (type === `answer`) {
      return `</td>
        <td class="result__points">× ${RIGHT_ANSWER_MULTIPLIER}</td>
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
      <td class="result__points">× ${TYPE_MULTIPLIER}</td>
      <td class="result__total">${score}</td>
    </tr>`
      : ``;
  }

  resultsRender(result) {
    const newResult = [...result];
    return `
    ${newResult.reverse().map((it, i)=>{
    return `<tr>
    <td class="result__number">${++i}.</td>
      <td colspan="2">
        ${currentStats(it.statistic.answers)}   
      </td>
      ${it.score.total === -1
    ? `<td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>`
    : `${this.renderScoreType(it.score.answer, it.statistic.answer, `answer`)}
        ${this.renderScoreType(it.score.fast, it.statistic.fast, `fast`)}
          ${this.renderScoreType(it.score.lives, it.statistic.lives, `lives`)}
          ${this.renderScoreType(it.score.slow, it.statistic.slow, `slow`)}
          <tr>
        <td colspan="5" class="result__total  result__total--final">${it.score.total}</td>
      </tr>`}
    </tr>`;
  }).join(``)
}`;
  }

  get scoreType() {
    return this.results[this.results.length - 1].score.total < 0;
  }

  get template() {
    return `<header class="header"></header>
    <section class="result">
    <h2 class="result__title">${this.scoreType ? `FAIL` : `Победа`}</h2>
      <table class="result__table">
        ${this.resultsRender(this.results)}
      </table>
    </section>`;
  }

  back() {}

  bind() {
    const header = this.element.querySelector(`.header`);
    header.appendChild(this.backBtn.element);
  }
}