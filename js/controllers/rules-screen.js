import RulesView from "../views/rules-view";
import Router from "../router";

export default class RulesScreen {
  static back() {
    Router.showGreetings();
  }

  static click(name) {
    Router.showGame(name);
  }

  constructor() {
    this.rules = new RulesView();
    this.rules.onClick = RulesScreen.click.bind(this);
    this.rules.back = RulesScreen.back.bind(this);
  }

  get element() {
    return this.rules.element;
  }
}
