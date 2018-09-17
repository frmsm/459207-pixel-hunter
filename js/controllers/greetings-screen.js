import GreetingsView from "../views/static-screens/greetings-view";
import Router from "../router";

export default class GreetingsScreen {
  static click() {
    Router.showRules();
  }

  constructor() {
    this.greet = new GreetingsView();
    this.greet.onClick = GreetingsScreen.click.bind(this);
  }

  get element() {
    return this.greet.element;
  }
}
