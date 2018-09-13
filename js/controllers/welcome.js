import IntroView from "../Screens/static-screens/welcome-view";
import Router from "./router";
import {ONE_SECOND} from "../data/game";

export default class WelcomeScreen {
  constructor() {
    this.intro = new IntroView();
    this.intro.onClick = this.click.bind(this);
  }

  get element() {
    return this.intro.element;
  }

  click() {
    this.intro.onClose();
    setTimeout(() => Router.showGreetings(), ONE_SECOND);
  }
}
