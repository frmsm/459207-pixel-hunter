import {resize} from "../../data/resize";
import AbstractView from "../Abstract";
import {curStats} from "../../current-stats";

export default class LevelView extends AbstractView {
  constructor(level, answers) {
    super();
    this.answers = answers;
    this.level = level;
    this.FIND_CORRECT_IMAGES_COUNT = 3;
  }

  get template() {
    return `
<section class="game">
    <p class="game__task">${this.level.question}</p>
    <form class="game__content">
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

  setContentStyle(images, level, frame) {
    [...images].forEach((it, i) => {
      const img = new Image();
      img.addEventListener(`load`, function () {
        const naturalSize = {width: img.width, height: img.height};
        const resolution = resize(frame, naturalSize);
        img.width = resolution.width;
        img.height = resolution.height;
        it.appendChild(img);
      });
      img.src = level.answers[i].image.url;
      img.alt = `Option ${i + 1}`;
    });
  }

  onAnswer() {}

  getQuestionValue(question) {
    return [...question].find((q) => {
      return q.type === `radio` && q.checked;
    });
  }
}
