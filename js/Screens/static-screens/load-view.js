import AbstractView from "../Abstract";

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="loader"></div>`;
  }
}
