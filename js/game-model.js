import {INITIAL_STATE, GAME_FAIL, MAX_LEVEL, NO_LIVES, ADD_LEVEL} from "./data/game";
import StateUpdater from "./data/state-updater";

export default class GameModel {
  constructor(playerName = ``, data, images) {
    this.playerName = playerName;
    this.data = data;
    this.images = images;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  die() {
    this._state = StateUpdater.die(this._state);
  }

  hasNextLevel() {
    return this.checkLevel(this._state.level + ADD_LEVEL) > GAME_FAIL;
  }

  isEndGame() {
    return !this.hasNextLevel() || this.isDead();
  }

  checkLevel(lvl) {
    if (typeof lvl !== `number`) {
      throw new Error(`Level should be number`);
    }
    if (lvl > MAX_LEVEL) {
      return GAME_FAIL;
    }
    if (lvl <= GAME_FAIL) {
      throw new Error(`Level should not be negative`);
    }
    return lvl;
  }

  getLevel(level) {
    return this.data[level];
  }

  nextLevel() {
    this._state = StateUpdater.changeLevel(this._state, this._state.level + 1);
  }

  restart() {
    this._state = INITIAL_STATE;
  }

  isDead() {
    return this._state.lives <= NO_LIVES;
  }

  getCurrentLevel() {
    return this.getLevel(this._state.level);
  }

  tick() {
    this._state = StateUpdater.tick(this._state);
  }

  isTimeEnd() {
    return StateUpdater.checkTimeEnd(this._state);
  }

  updateAnswers() {
    this._state = StateUpdater.updateAnswersArray(this._state);
  }
}
