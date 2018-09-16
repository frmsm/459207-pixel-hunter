import {resize} from "../../data/resize";
import AbstractView from "../abstract-view";
import {currentStats} from "./current-stats";
import GameTimer from "../header/game-time-view";
import GameLives from "../header/game-lives-view";
import {DEBUG} from "../../data/game";
import BackButton from "../header/back-button-view";

export default class LevelView extends AbstractView {
  static getQuestionValue(question) {
    return [...question].find((q) => {
      return q.type === `radio` && q.checked;
    });
  }

  constructor(level, state, images, stopGame, labelInput) {
    super();
    this.answers = state.answers;
    this.level = level;
    this.labelInput = labelInput;
    this.images = images;

    this.backBtn = new BackButton(()=>this.back());
    this.timer = new GameTimer(state.time);
    this.lives = new GameLives(state.lives);

    this.headerElement = this.element.querySelector(`.header`);
    this.addHeader();
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
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="painting">
                <span>Рисунок</span>
              </label>`
    : ``}            
         </div>`;
  }).join(``)}
  </form>
  ${currentStats(this.answers)}
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

  back() {}

  onAnswer() {}

  updateTimer(time) {
    const timer = new GameTimer(time);
    this.headerElement.replaceChild(timer.element, this.timer.element);
    this.timer = timer;
  }

  addHeader() {
    this.headerElement.appendChild(this.backBtn.element);
    this.headerElement.appendChild(this.timer.element);
    this.headerElement.appendChild(this.lives.element);
  }

  showAnswers() {
    if (DEBUG) {
      const questionElement = this.element.querySelector(`.game__task`);
      const rightAnswerElement = document.createElement(`span`);
      rightAnswerElement.style.color = `red`;
      rightAnswerElement.textContent = this.level.answers.map((it)=>it.type).join(` `);
      questionElement.appendChild(rightAnswerElement);
    }
  }
}
