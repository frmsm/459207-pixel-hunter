import AbstractView from "../Abstract";
// import {gameHeader} from "../game-header";

export default class BackButton extends AbstractView {
  constructor(state = null) {
    super();
    this.state = state;
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
    </button>`;
  }

  onClick() {}

  bind() {
    const goBackButton = this.element.querySelector(`.back`);
    goBackButton.addEventListener(`click`, this.onClick);
  }
}

//   ${gameHeader(this.state)}