import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {INITIAL_STATE} from "./data/game";
import {firstLevelRender} from "./game-render";

const rulesElem = `<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;

const tmp = `<header class="header">
    ${backButton}
  </header>
  ${rulesElem}`;

const MIN_NAME_LENGTH = 4;

let rules = getElementFromTemplate(tmp);

export const showRules = () => {
  selectScreen(rules);
};

const inputName = rules.querySelector(`.rules__input`);

const goButton = rules.querySelector(`.rules__button`);
goButton.addEventListener(`click`, (e)=>{
  e.preventDefault();
  firstLevelRender(INITIAL_STATE);
});

const goBackButton = rules.querySelector(`.back`);
goBackButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  showGreetings();
});

inputName.addEventListener(`input`, (e) => {
  goButton.disabled = e.target.value.trim().length < MIN_NAME_LENGTH;
});

