import LevelView from "./game-screen";

export default class GameThree extends LevelView {
  constructor(level, answers) {
    super(level, answers);
    this.level = level;
    this.answers = answers;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);

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
