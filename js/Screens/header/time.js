import AbstractView from "../Abstract";

export default class GameTimer extends AbstractView {
  constructor(time) {
    super();
    this.time = time;
  }
  get template() {
    return `<div class="game__timer">${this.time}</div>`;
  }
}
