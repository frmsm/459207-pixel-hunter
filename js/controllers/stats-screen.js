import StatsView from "../views/stats-view";
import Router from "../router";

export default class StatsScreen {
  static back() {
    Router.showGreetings();
  }

  constructor(results) {
    this.results = results;
    this.stats = new StatsView(this.results);
    this.stats.back = StatsScreen.back.bind(this);
  }

  get element() {
    return this.stats.element;
  }
}

