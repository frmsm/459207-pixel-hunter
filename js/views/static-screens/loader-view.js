import AbstractView from "../abstract-view";

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="loader"></div>`;
  }
}
