import ModalView from "../Screens/static-screens/modal-view";
import Router from "./router";

export default class ModalScreen {
  constructor(stopTimer) {
    this.stopTimer = stopTimer;
    this.modal = new ModalView();
    this.modal.onOk = this.ok.bind(this);
  }

  get element() {
    return this.modal.element;
  }

  ok(e) {
    e.preventDefault();
    this.stopTimer();
    Router.showGreetings();
  }
}
