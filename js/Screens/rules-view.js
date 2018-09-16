import AbstractView from "./abstract";
// import BackButton from "../controllers/back-button";
import BackButton from "./header/back-button";

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.backBtn = new BackButton(()=>this.back());
  }

  get template() {
    return `
    <header class="header"></header>
    <section class="rules">
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
  }

  back() {}

  onClick() {}

  bind() {
    const MIN_NAME_LENGTH = 4;

    const inputName = this.element.querySelector(`.rules__input`);
    const header = this.element.querySelector(`.header`);
    header.appendChild(this.backBtn.element);

    const goButton = this.element.querySelector(`.rules__button`);
    goButton.addEventListener(`click`, (e)=>{
      e.preventDefault();
      this.onClick(inputName.value);
    });

    inputName.addEventListener(`input`, (e) => {
      goButton.disabled = e.target.value.trim().length < MIN_NAME_LENGTH;
    });
  }
}
