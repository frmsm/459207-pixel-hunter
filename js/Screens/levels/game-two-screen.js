import LevelView from "./game-screen";

export default class GameTwo extends LevelView {
  constructor(level, answers) {
    super(level, answers);
    this.level = level;
    this.answers = answers;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.classList.add(`game__content--wide`);

    const questionOne = this.element.querySelectorAll(`[name=question1]`);
    const answers = this.level.answers;

    gameContent.addEventListener(`click`, () => {
      const q1 = this.getQuestionValue(questionOne);
      if (q1) {
        this.onAnswer(q1.value === answers[0].type);
      }
    });
  }
}
