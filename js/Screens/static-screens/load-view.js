import AbstractView from "../abstract";

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="loader"></div>`;
  }
}
