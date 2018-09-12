import AbstractView from "../Abstract";
import {HALF_SECOND, TIME_LEFT} from "../../data/game";

export default class GameTimerView extends AbstractView {
  constructor(time) {
    super();
    this.time = time;
  }
  get template() {
    return `<div class="game__timer">${this.time}</div>`;
  }

  bind() {
    const time = this.element.querySelector(`.game__timer`);
    if (this.time <= TIME_LEFT) {
      time.style.color = `red`;
      setTimeout(()=>{
        time.style.color = `black`;
      }, HALF_SECOND);
    }
  }
}
