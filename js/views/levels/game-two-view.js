import LevelView from "./level-view";

export default class GameTwoView extends LevelView {
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
    gameContentElement.classList.add(`game__content--wide`);
    this.showAnswers();

    const questionOneElement = this.element.querySelectorAll(`[name=question1]`);
    const answers = this.level.answers;

    gameContentElement.addEventListener(`click`, () => {
      const q1 = LevelView.getQuestionValue(questionOneElement);
      if (q1) {
        this.onAnswer(q1.value === answers[0].type);
      }
    });
  }
}
