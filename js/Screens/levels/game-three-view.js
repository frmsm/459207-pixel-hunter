import LevelView from "./game-view";

export default class GameThreeView extends LevelView {
  constructor(level, answers) {
    super(level, answers);
    this.level = level;
    this.answers = answers;
    this.labelInput = false;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.classList.add(`game__content--triple`);

    gameContent.addEventListener(`click`, (e) => {
      const gameOption = e.target.closest(`.game__option`);
      if (gameOption) {
        gameOption.classList.add(`game__option--selected`);
        const imgIndex = gameOption.firstElementChild.alt.substr(-1, 1) - 1;
        this.onAnswer(this.level.answers[imgIndex].type);
      }
    });
  }
}
