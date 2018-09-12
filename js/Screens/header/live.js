import AbstractView from "../Abstract";
import {INITIAL_STATE} from "../../data/game";

export default class GameLivesView extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }

  get template() {
    return `<div class="game__lives">
      ${new Array(INITIAL_STATE.lives - this.lives)
      .fill(`<img src="../../../img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
      ${new Array(this.lives)
      .fill(`<img src="../../../img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
    </div>`;
  }
}
