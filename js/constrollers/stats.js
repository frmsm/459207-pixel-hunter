import StatsView from "../Screens/stats-view";
import {RESULTS} from "../data/game";

export default class StatsScreen {
  constructor() {
    this.stats = new StatsView(RESULTS);

  }

  get element() {
    return this.stats.element;
  }
}

