import {ONE_SECOND, TIME_LEFT} from "../data/game";
import GameOneView from "../Screens/levels/game-one-view";
import GameTwoView from "../Screens/levels/game-two-view";
import GameThreeView from "../Screens/levels/game-three-view";
import GameTimer from "../Screens/header/time";
import GameLives from "../Screens/header/live";
import Router from "./router";
import {HeaderPart} from "./app-screens";

export default class LevelScreen {
  constructor(model) {
    this.model = model;

    this.root = document.createElement(`div`);
    this.back = new HeaderPart(()=>this.stopGame());
    this.header = this.back.element;
    this.timer = new GameTimer(this.model.state.time);
    this.live = new GameLives(this.model.state);
    this.header.appendChild(this.timer.element);
    this.header.appendChild(this.live.element);
    this.level = this.setGameType(this.model.state);
    this.root.appendChild(this.header);
    this.root.appendChild(this.level.element);

    this._timeOut = null;
  }

  get element() {
    return this.root;
  }

  updateHeader() {
    const timer = new GameTimer(this.model.state.time);
    const lives = new GameLives(this.model.state);

    this.header.replaceChild(timer.element, this.timer.element);
    this.header.replaceChild(lives.element, this.live.element);

    this.timer = timer;
    this.live = lives;

    this.blinkTimer();
  }

  startGame() {
    this.changeLevel();
  }

  startTimer() {
    this._timeOut = setTimeout(() => {
      this.model.tick();
      this.updateHeader();
      if (this.model.endTime()) {
        this.stopGame();
        this.model.die();
        this.shouldLevelChange();
      } else {
        this.startTimer();
      }
    }, ONE_SECOND);
  }

  blinkTimer() {
    if (this.model.state.time <= TIME_LEFT) {
      this.timer.element.style.color = `red`;
      setTimeout(()=>{
        this.timer.element.style.color = `black`;
      }, 500);
    }
  }

  stopGame() {
    clearInterval(this._timeOut);
  }

  changeLevel() {
    this.updateHeader();
    const level = this.setGameType(this.model.state);
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
    this.startTimer();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
  }

  setGameType(state) {
    const level = this.model.getCurrentLevel();
    const type = level.type;
    const gameTypes = {
      'tinder-like': GameTwoView,
      'two-of-two': GameOneView,
      'one-of-three': GameThreeView
    };
    return new gameTypes[type](level, state.answers);
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
