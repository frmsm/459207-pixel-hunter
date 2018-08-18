import {getElementFromTemplate, selectScreen} from "./utils";
import {showGreetings} from "./greeting";

const tmp = `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

let intro = getElementFromTemplate(tmp);

export const showIntro = () => {
  selectScreen(intro, introEvents);
};

export const introEvents = (node) => {
  node.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
    showGreetings();
  });
};
