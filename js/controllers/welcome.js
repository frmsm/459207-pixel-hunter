import IntroView from "../Screens/static-screens/welcome-view";

export default class WelcomeScreen {
  constructor() {
    this.intro = new IntroView();
  }

  get element() {
    return this.intro.element;
  }
}
