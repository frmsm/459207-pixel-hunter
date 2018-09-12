import IntroView from "../Screens/static-screens/Welcome";
import Router from "./router";

export default class WelcomeScreen {
  constructor() {
    this.intro = new IntroView();
    this.intro.onClick = this.click.bind(this);
  }

  get element() {
    return this.intro.element;
  }

  click() {
    Router.showGreetings();
  }
}
