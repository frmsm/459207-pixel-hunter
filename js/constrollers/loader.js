import LoaderView from "../Screens/static-screens/load-view";
import Router from "./router";

export default class LoaderScreen {
  constructor() {
    this.loader = new LoaderView();
  }

  get element() {
    return this.loader.element;
  }

  nextScreen() {
    Router.showWelcome();
  }

  error() {
    Router.showError();
  }
}
