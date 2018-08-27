import {INITIAL_STATE} from "./data/game";

export const gameHeader = `<div class="game__timer">${INITIAL_STATE.time}</div>
    <div class="game__lives">
      ${new Array(3 - INITIAL_STATE.lives)
        .fill(`<img src="../img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
        .join(``)}
      ${new Array(INITIAL_STATE.lives)
        .fill(`<img src="../img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
    </div>`;
