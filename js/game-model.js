import {
  endTime,
  tick,
  die,
  INITIAL_STATE,
  changeLevel,
  updateAnswers,
  setLevel
} from "./data/game";
import {pushResults} from "./data/scores";

export default class GameModel {
  constructor(playerName = ``, data) {
    this.playerName = playerName;
    this.data = data;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  die() {
    this._state = die(this._state);
  }

  hasNextLevel() {
    return setLevel(this._state.level + 1) > -1;
  }

  isEndGame() {
    return !this.hasNextLevel() || this.isDead();
  }

  getLevel(level) {
    return this.data[level];
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  restart() {
    this._state = INITIAL_STATE;
  }

  isDead() {
    return this._state.lives < 0;
  }

  getCurrentLevel() {
    return this.getLevel(this._state.level);
  }

  tick() {
    this._state = tick(this._state);
  }

  endTime() {
    return endTime(this._state);
  }

  updateAnswers() {
    this._state = updateAnswers(this._state);
  }

  updateResults() {
    pushResults(this._state);
  }
}
