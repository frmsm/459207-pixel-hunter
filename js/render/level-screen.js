import {ONE_SECOND} from "../data/game";
import GameOneView from "../Screens/levels/game-one-view";
import GameTwoView from "../Screens/levels/game-two-view";
import GameThreeView from "../Screens/levels/game-three-view";
import Router from "./router";

export default class LevelScreen {
  constructor(model) {
    this.model = model;
    this.level = this.setGameType(this.model.getCurrentLevel(), this.model.state);
    this.level.onAnswer = this.answer.bind(this);
    this._timeOut = null;
    this.startTimer();
  }

  setGameType(level, state) {
    const type = level.type;
    const gameTypes = {
      'tinder-like': GameTwoView,
      'two-of-two': GameOneView,
      'one-of-three': GameThreeView
    };
    return new gameTypes[type](level, state);
  }

  get element() {
    return this.level.element;
  }

  startTimer() {
    this._timeOut = setInterval(()=> {
      this.model.tick();
      this.level.updateTimer(this.model.state.time);
      if (this.model.endTime()) {
        this.stopGame();
        this.model.die();
        this.shouldLevelChange();
      }
    }, ONE_SECOND);
  }

  stopGame() {
    clearInterval(this._timeOut);
  }

  changeLevel() {
    Router.showLevel(this.model);
  }

  exit() {
    Router.showStats();
  }

  shouldLevelChange() {
    if (!this.model.hasNextLevel() || this.model.isDead()) {
      this.model.updateResults();
      this.exit();
    } else {
      this.model.nextLevel();
      this.changeLevel();
    }
  }

  answer(answer) {
    this.stopGame();
    if (answer) {
      this.model.updateAnswers();
    } else {
      this.model.die();
    }
    this.shouldLevelChange();
  }
}
