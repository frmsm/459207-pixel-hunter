import LoaderView from "../Screens/static-screens/loader-view";

export default class LoaderScreen {
  constructor() {
    this.loader = new LoaderView();
  }

  get element() {
    return this.loader.element;
  }
}
