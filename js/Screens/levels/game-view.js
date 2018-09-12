import {resize} from "../../data/resize";
import AbstractView from "../Abstract";
import {curStats} from "../../current-stats";
import BackButton from "../../constrollers/back-button";
import GameTimer from "../header/time";
import GameLives from "../header/live";

export default class LevelView extends AbstractView {
  constructor(level, state, images, stopGame, labelInput) {
    super();
    this.answers = state.answers;
    this.level = level;
    this.labelInput = labelInput;
    this.stopGame = stopGame;
    this.images = images;

    this.backBtn = new BackButton(this.stopGame);
    this.timer = new GameTimer(state.time);
    this.lives = new GameLives(state.lives);

    this.header = this.element.querySelector(`.header`);
  }

  get template() {
    return `<header class="header"></header>
    <section class="game">
    <p class="game__task">${this.level.question}</p>
    <form class="game__content">
    ${this.level.answers.map((it, i) => {
    return `<div class="game__option">
     ${this.labelInput
    ? `<label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>`
    : ``}            
         </div>`;
  }).join(``)}
  </form>
  ${curStats(this.answers)}
</section>`;
  }

  setContentStyle(images, level) {
    [...images].forEach((it, i) => {
      const img = this.images[level.answers[i].image.url];
      img.alt = `Option ${i + 1}`;
      const naturalSize = {width: img.width, height: img.height};
      const frame = {
        width: level.answers[i].image.width,
        height: level.answers[i].image.height
      };
      const resolution = resize(frame, naturalSize);
      img.width = resolution.width;
      img.height = resolution.height;
      it.appendChild(img);
    });
  }

  onAnswer() {}

  updateTimer(time) {
    const timer = new GameTimer(time);
    this.header.replaceChild(timer.element, this.timer.element);
    this.timer = timer;
  }

  getQuestionValue(question) {
    return [...question].find((q) => {
      return q.type === `radio` && q.checked;
    });
  }

  addHeader() {
    this.header.appendChild(this.backBtn.element);
    this.header.appendChild(this.timer.element);
    this.header.appendChild(this.lives.element);
  }
}
