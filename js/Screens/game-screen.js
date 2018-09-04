import {resize} from "../data/resize";
import AbstractView from "./Abstract";
import {curStats} from "../current-stats";

export default class LevelView extends AbstractView {
  constructor(level, answers) {
    super();
    this.answers = answers;
    this.level = level;
    this.gameContentStyle = {
      1: `game__content--wide`,
      2: ``,
      3: `game__content--triple`,
    };
    this.answersCount = level.answers.length;
    this.FIND_CORRECT_IMAGES_COUNT = 3;
    this.frame = {
      2: {
        width: 468,
        height: 450
      },
      1: {
        width: 705,
        height: 455
      },
      3: {
        width: 304,
        height: 455
      }
    };
    this.addImage(this.element);
  }

  get template() {
    return `
<section class="game">
    <p class="game__task">${this.level.question}</p>
    <form class="game__content ${this.gameContentStyle[this.level.answers.length]}">
    ${this.level.answers.map((it, i) => {
    return this.level.answers.length !== this.FIND_CORRECT_IMAGES_COUNT
      ? `<div class="game__option">      
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`
      : `<div class="game__option">            
         </div>`;
  }).join(``)}
  </form>
  ${curStats(this.answers)}
</section>`;
  }

  addImages(images, level, frame) {
    [...images].forEach((it, i) => {
      const img = new Image();
      img.addEventListener(`load`, function () {
        const naturalSize = {width: img.width, height: img.height};
        const resolution = resize(frame, naturalSize);
        img.width = resolution.width;
        img.height = resolution.height;
        it.appendChild(img);
      });
      img.src = level.answers[i].img;
      img.alt = `Option ${i + 1}`;
    });
  }

  onAnswer() {}

  checkQuestion(question) {
    let value = ``;
    return [...question].some((q)=> {
      value = q.value;
      return q.type === `radio` && q.checked;
    }) ? value : false;
  }

  addImage() {
    const images = this.element.querySelectorAll(`.game__option`);
    this.addImages(images, this.level, this.frame[this.answersCount]);
  }
}
