import AbstractView from "../Abstract";

export default class GameTimerView extends AbstractView {
  constructor(time) {
    super();
    this.time = time;
  }
  get template() {
    return `<div class="game__timer">${this.time}</div>`;
  }
}
