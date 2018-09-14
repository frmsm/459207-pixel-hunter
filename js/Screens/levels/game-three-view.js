import LevelView from "./level-view";

export default class GameThreeView extends LevelView {
  constructor(level, state, images, stopGame) {
    const labelInput = false;
    super(level, state, images, stopGame, labelInput);
    this.level = level;
  }

  get rightAnswer() {
    const RIGHT = true;
    const WRONG = false;
    let options = {};

    for (let a of this.level.answers) {
      options[a.type] = options[a.type] === undefined
        ? RIGHT
        : WRONG;
    }

    let right;
    for (let key in options) {
      if (options[key] === RIGHT) {
        right = key;
        break;
      }
    }

    return right;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.classList.add(`game__content--triple`);
    this.showAnswers();

    gameContent.addEventListener(`click`, (e) => {
      const gameOption = e.target.closest(`.game__option`);
      if (gameOption) {
        gameOption.classList.add(`game__option--selected`);
        const imgIndex = gameOption.firstElementChild.alt.substr(-1, 1) - 1;
        this.onAnswer(this.level.answers[imgIndex].type === this.rightAnswer);
      }
    });
  }
}
