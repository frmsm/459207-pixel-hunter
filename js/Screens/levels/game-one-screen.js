import LevelView from "./game-screen";

export default class GameOne extends LevelView {
  constructor(level, answers) {
    super(level, answers);
    this.level = level;
    this.answers = answers;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);

    const questionOne = this.element.querySelectorAll(`[name=question1]`);
    const questionTwo = this.element.querySelectorAll(`[name=question2]`);

    gameContent.addEventListener(`click`, () => {
      const q1 = this.getQuestionValue(questionOne);
      const q2 = this.getQuestionValue(questionTwo);
      if (q1 && q2) {
        this.onAnswer(q1.value === this.level.answers[0].type && q2.value === this.level.answers[1].type);
      }
    });
  }
}

