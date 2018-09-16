import LevelView from "./level-view";

export default class GameOneView extends LevelView {
  constructor(level, state, images, stopGame) {
    const labelInput = true;
    super(level, state, images, stopGame, labelInput);
    this.level = level;
    this.answers = state.answers;
  }

  bind() {
    const imagesElement = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(imagesElement, this.level);

    const gameContentElement = this.element.querySelector(`.game__content`);
    this.showAnswers();

    const questionOneElement = this.element.querySelectorAll(`[name=question1]`);
    const questionTwoElement = this.element.querySelectorAll(`[name=question2]`);

    gameContentElement.addEventListener(`click`, () => {
      const q1 = LevelView.getQuestionValue(questionOneElement);
      const q2 = LevelView.getQuestionValue(questionTwoElement);
      if (q1 && q2) {
        this.onAnswer(q1.value === this.level.answers[0].type && q2.value === this.level.answers[1].type);
      }
    });
  }
}

