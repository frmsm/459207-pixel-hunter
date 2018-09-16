import IntroView from "../views/static-screens/intro-view";

export default class WelcomeScreen {
  constructor() {
    this.intro = new IntroView();
  }

  get element() {
    return this.intro.element;
  }
}
