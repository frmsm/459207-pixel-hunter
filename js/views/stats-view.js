import {currentStats} from "./levels/current-stats";
import AbstractView from "./abstract-view";
import BackButton from "./header/back-button-view";
import {Multiplier} from "../data/game";

const ScoreType = {
  'fast': `Бонус за скорость:`,
  'slow': `Штраф за медлительность`,
  'lives': `Бонус за жизни:`
};

const StyleType = {
  'fast': `stats__result--fast`,
  'slow': `stats__result--slow`,
  'lives': `stats__result--alive`
};

export default class StatsView extends AbstractView {
  static renderScoreType(score, count, type) {
    if (type === `answer`) {
      return `</td>
        <td class="result__points">× ${Multiplier.Answer.RIGHT}</td>
        <td class="result__total">${score}</td>
      </tr>`;
    }

    return score > 0
      ? `<tr>
      <td></td>
      <td class="result__extra">${ScoreType[type]}</td>
      <td class="result__extra">${count} <span class="stats__result ${StyleType[type]}"></span></td>
      <td class="result__points">× ${Multiplier.Answer.TYPE}</td>
      <td class="result__total">${score}</td>
    </tr>`
      : ``;
  }

  constructor(results) {
    super();
    this.results = results;
    this.backBtn = new BackButton(()=>this.back());
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

  get scoreType() {
    return this.results[this.results.length - 1].score.total < 0;
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
    : `${StatsView.renderScoreType(it.score.answer, it.statistic.answer, `answer`)}
       ${StatsView.renderScoreType(it.score.fast, it.statistic.fast, `fast`)}
       ${StatsView.renderScoreType(it.score.lives, it.statistic.lives, `lives`)}
       ${StatsView.renderScoreType(it.score.slow, it.statistic.slow, `slow`)}
       <tr>
        <td colspan="5" class="result__total  result__total--final">${it.score.total}</td>
      </tr>`}
    </tr>`;
  }).join(``)
}`;
  }

  back() {}

  bind() {
    const headerElement = this.element.querySelector(`.header`);
    headerElement.appendChild(this.backBtn.element);
  }
}
