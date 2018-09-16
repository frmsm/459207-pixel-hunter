import AbstractView from "../abstract-view";

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn modal__btn-ok">Ок</button>
        <button class="modal__btn modal__btn-cancel">Отмена</button>
      </div>
    </form>
  </section>
    `;
  }

  onOk() {}

  closeModal() {
    this.element.parentNode.removeChild(this.element);
  }

  bind() {
    const okBtnElement = this.element.querySelector(`.modal__btn-ok`);
    const cancelBtnElement = this.element.querySelector(`.modal__btn-cancel`);
    const closeBtnElement = this.element.querySelector(`.modal__close`);

    okBtnElement.addEventListener(`click`, (e)=>this.onOk(e));
    cancelBtnElement.addEventListener(`click`, (e)=>{
      e.preventDefault();
      this.closeModal();
    });
    closeBtnElement.addEventListener(`click`, ()=>this.closeModal());
  }
}
