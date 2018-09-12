import RulesView from "../Screens/rules-view";
import Router from "./router";

export default class RulesScreen {
  constructor() {
    this.rules = new RulesView();

    this.rules.onClick = this.click.bind(this);
  }

  get element() {
    return this.rules.element;
  }

  click(name) {
    Router.showGame(name);
  }
}
