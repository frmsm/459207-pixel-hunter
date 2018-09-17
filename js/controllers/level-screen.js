import {ONE_SECOND} from "../data/game";
import GameOneView from "../views/levels/game-one-view";
import GameTwoView from "../views/levels/game-two-view";
import GameThreeView from "../views/levels/game-three-view";
import Router from "../router";

const GameType = {
  'tinder-like': GameTwoView,
  'two-of-two': GameOneView,
  'one-of-three': GameThreeView
};

export default class LevelScreen {
  constructor(model) {
    this.model = model;
    this.level = this.setGameType();
    this.level.onAnswer = this.answer.bind(this);
    this.level.back = this.back.bind(this);
    this._timeOut = null;
    this.startTimer();
  }

  setGameType() {
    const level = this.model.getCurrentLevel();
    const type = level.type;
    return new GameType[type](level, this.model.state, this.model.images);
  }

  get element() {
    return this.level.element;
  }

  startTimer() {
    this._timeOut = setInterval(()=> {
      this.model.tick();
      this.level.updateTimer(this.model.state.time);
      if (this.model.isTimeEnd()) {
        this.stopGame();
        this.model.die();
        this.continueGame();
      }
    }, ONE_SECOND);
  }

  back() {
    Router.showModal(()=>this.stopGame());
  }

  stopGame() {
    clearInterval(this._timeOut);
  }

  newLevel() {
    this.model.nextLevel();
    Router.showLevel(this.model);
  }

  exit() {
    Router.showStats(this.model);
  }

  continueGame() {
    if (this.model.isEndGame()) {
      this.exit();
    } else {
      this.newLevel();
    }
  }

  answer(answer) {
    this.stopGame();
    if (answer) {
      this.model.updateAnswers();
    } else {
      this.model.die();
    }
    this.continueGame();
  }
}
