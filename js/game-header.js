import {INITIAL_STATE} from "./data/game";
import {shouldLevelRender} from "./game-render";

// const timeRender = (time) => {
//   //const date = new Date();
//   let seconds = date.getSeconds();
//   //if (seconds < 10) seconds = '0' + seconds;
//   //clock.children[2].innerHTML = seconds;
// }

export const gameHeader = (state) => `<div class="game__timer">${state.time}</div>
    <div class="game__lives">
      ${new Array(3 - state.lives)
        .fill(`<img src="../img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(state.lives)
        .fill(`<img src="../img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
    </div>`;

// const gameTimer = gameHeader.querySelector(`.game__timer`);
//
// export const timer = () => {
//   gameTimer.innerHTML--;
//
//   if (gameTimer.innerHTML === 0) {
//     alert(`Hello`);
//     setTimeout(function () {}, 1000);
//   } else {
//     setTimeout(timer, 1000);
//   }
// };
// export const startTimer = (obj, state) => {
//   console.log(obj.innerHTML);
//   obj.innerHTML--;
//   if (Number(obj.innerHTML) < 6) {
//     obj.style.color = `red`;
//     // setTimeout(()=>{
//     //   obj.style.color = `black`;
//     // }, 500);
//   }
//   if (obj.innerHTML === `0`) {
//     shouldLevelRender(state);
//     // setTimeout(function () {}, 1000);
//   } else {
//     setTimeout(startTimer, 1000);
//   }
// };
