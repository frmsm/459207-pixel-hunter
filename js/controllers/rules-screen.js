import RulesView from "../views/rules-view";
import Router from "../router";

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();

    this.rules.onClick = this.click.bind(this);
    this.rules.back = this.back.bind(this);
  }

  get element() {
    return this.rules.element;
  }

  back() {
    Router.showGreetings();
  }

  click(name) {
    Router.showGame(name);
  }
}
