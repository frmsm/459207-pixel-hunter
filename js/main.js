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

const screens = [greeting, rules, intro, gameOne, gameTwo, gameThree, stats, modalError, modalConfirm];

const arrowBtns = document.querySelectorAll(`.arrows__btn`);

const selectScreen = (screen) => {
  main.innerHTML = ``;
  main.appendChild(screen.content.cloneNode(true));
};

let currentScreen = 0;
selectScreen(screens[currentScreen]);

const selectScreenNumber = (num) => {
  num = num > screens.length - 1 ? 0 : num;
  num = num < 0 ? screens.length - 1 : num;
  currentScreen = num;
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

arrowBtns[0].addEventListener(`click`, ()=>selectScreenNumber(currentScreen - 1));
arrowBtns[1].addEventListener(`click`, ()=>selectScreenNumber(currentScreen + 1));

