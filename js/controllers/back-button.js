import Router from "./router";
import BackButtonView from "../Screens/header/back-button";

export default class BackButton {
  constructor(stopTimer = null) {
    this.button = new BackButtonView();
    this.stopTimer = stopTimer;
    this.button.onClick = this.click.bind(this);
  }

  get element() {
    return this.button.element;
  }

  click() {
    if (this.stopTimer) {
      Router.showModal(this.stopTimer);
    } else {
      Router.showGreetings();
    }
  }
}
