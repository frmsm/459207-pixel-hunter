import LevelView from "./level-view";

export default class GameTwoView extends LevelView {
  constructor(level, state, images, stopGame) {
    const labelInput = true;
    super(level, state, images, stopGame, labelInput);
    this.level = level;
    this.answers = state.answers;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.setContentStyle(images, this.level);

    const gameContent = this.element.querySelector(`.game__content`);
    gameContent.classList.add(`game__content--wide`);
    this.showAnswers();

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
