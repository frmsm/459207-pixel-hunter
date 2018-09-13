import StatsView from "../Screens/stats-view";
import Router from "../router";

export default class StatsScreen {
  constructor(results) {
    this.results = results;
    this.stats = new StatsView(this.results);
    this.stats.back = this.back.bind(this);
  }

  back() {
    Router.showGreetings();
  }

  get element() {
    return this.stats.element;
  }
}

