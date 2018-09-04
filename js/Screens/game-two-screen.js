import LevelView from "./game-screen";

export default class GameTwo extends LevelView {
  constructor(level, answers) {
    super(level, answers);
    this.level = level;
    this.answers = answers;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);

    const questionOne = this.element.querySelectorAll(`[name=question1]`);
    const answers = this.level.answers;

    gameContent.addEventListener(`click`, () => {
      const q1 = this.checkQuestion(questionOne);
      if (q1) {
        this.onAnswer(q1 === answers[0].type);
      }
    });
  }
}
