import AbstractView from "../abstract-view";
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
    const timeElement = this.element.querySelector(`.game__timer`);
    if (this.time <= TIME_LEFT) {
      timeElement.style.color = `red`;
      setTimeout(()=>{
        timeElement.style.color = `black`;
      }, HALF_SECOND);
    }
  }
}
