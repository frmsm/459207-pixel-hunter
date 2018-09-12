import ErrorView from "../Screens/static-screens/error-view";

export default class ErrorScreen {
  constructor() {
    this.error = new ErrorView();
  }

  get element() {
    return this.error.element;
  }
}
