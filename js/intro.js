import {getElementFromTemplate, selectScreen} from "./utils";
import greeting from "./greeting";

const tmp = `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const intro = getElementFromTemplate(tmp);

intro.querySelector(`.intro__asterisk`).addEventListener(`click`, ()=>{
  selectScreen(greeting);
});

export default intro;
