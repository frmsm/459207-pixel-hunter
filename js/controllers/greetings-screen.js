import GreetingsView from "../views/static-screens/greetings-view";
import Router from "../router";

export default class GreetingsScreen {
  constructor() {
    this.greet = new GreetingsView();
    this.greet.onClick = this.click.bind(this);
  }

  get element() {
    return this.greet.element;
  }

  click() {
    Router.showRules();
  }
}
