import {ONE_SECOND, PIXEL_HUNTER} from "../data/game";
import GameOne from "../Screens/levels/game-one-screen";
import GameTwo from "../Screens/levels/game-two-screen";
import GameThree from "../Screens/levels/game-three-screen";
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
    const images = PIXEL_HUNTER[state.level].answers.length;
    const gameTypes = {
      1: GameTwo,
      2: GameOne,
      3: GameThree
    };
    return new gameTypes[images](PIXEL_HUNTER[state.level], state.answers);
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
