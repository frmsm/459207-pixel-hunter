import AbstractView from "../abstract-view";

export default class BackButtonView extends AbstractView {
  constructor(stopGame = null) {
    super();
    this.stopGame = stopGame;
  }

  get template() {
    return `
      <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
 `;
  }

  onClick() {
    this.stopGame();
  }

  bind() {
    const goBackButtonElement = this.element.querySelector(`.back`);
    goBackButtonElement.addEventListener(`click`, ()=>this.onClick());
  }
}

