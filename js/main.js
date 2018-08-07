'use strict';

const KEY_CODE = {
  left: 37,
  right: 39
};

const intro = document.getElementById(`intro`);
const greeting = document.getElementById(`greeting`);
const rules = document.getElementById(`rules`);
const gameOne = document.getElementById(`game-1`);
const gameTwo = document.getElementById(`game-2`);
const gameThree = document.getElementById(`game-3`);
const stats = document.getElementById(`stats`);
const modalError = document.getElementById(`modal-error`);
const modalConfirm = document.getElementById(`modal-confirm`);

const main = document.getElementById(`main`);

const screens = [intro, greeting, rules, gameOne, gameTwo, gameThree, stats, modalError, modalConfirm];

const selectScreen = (screen) => {
  main.innerHTML = ``;
  main.appendChild(screen.content.cloneNode(true));
};

let currentScreen = 0;
selectScreen(screens[currentScreen]);

const selectScreenNumber = (number) => {
  if (number < 0) {
    number = screens.length - 1;
  }
  if (number > screens.length - 1) {
    number = 0;
  }
  currentScreen = number;
  selectScreen(screens[currentScreen]);
};

document.addEventListener(`keyup`, (e)=> {
  e.preventDefault();
  switch (e.keyCode) {
    case KEY_CODE.left:
      selectScreenNumber(currentScreen - 1);
      break;
    case KEY_CODE.right:
      selectScreenNumber(currentScreen + 1);
      break;
    default:
      break;
  }
});

const arrowsElem = `
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  </div>`;

document.body.insertAdjacentHTML(`beforeEnd`, arrowsElem);

const arrowBtns = document.querySelectorAll(`.arrows__btn`);
arrowBtns[0].addEventListener(`click`, ()=>selectScreenNumber(currentScreen - 1));
arrowBtns[1].addEventListener(`click`, ()=>selectScreenNumber(currentScreen + 1));
