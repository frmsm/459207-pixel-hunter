import StatsView from "../Screens/stats-view";

export default class StatsScreen {
  constructor(results) {
    this.results = results;
    this.stats = new StatsView(this.results);

  }

  get element() {
    return this.stats.element;
  }
}

