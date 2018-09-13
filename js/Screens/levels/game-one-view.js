import LevelView from "./level-view";

export default class GameOneView extends LevelView {
  constructor(level, state, images, stopGame) {
    const labelInput = true;
    super(level, state, images, stopGame, labelInput);
    this.level = level;
    this.answers = state.answers;
    this.addHeader();
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);
    this.showAnswers();

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

