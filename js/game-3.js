import {getElementFromTemplate, selectScreen} from "./utils";
import {showStats} from "./stats";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader} from "./game-header";
import {gameRender} from "./game-render";
import {PIXEL_HUNTER} from "./data/game";

const tmp = `<header class="header">
    ${backButton}
    ${gameHeader}
  </header>
  ${gameRender(PIXEL_HUNTER[`level-3`])}`;

// Я удалил game__option--selected из вёрстки за ненадобностью

const gameThree = getElementFromTemplate(tmp);

export const showGameThree = () => {
  selectScreen(gameThree);
};

const gameContent = gameThree.querySelector(`.game__content`);

gameContent.addEventListener(`click`, (e) => {
  if (e.target.closest(`.game__option`)) {
    e.target.closest(`.game__option`).classList.add(`game__option--selected`);
    showStats();
  }
});

const goBackButton = gameThree.querySelector(`.back`);
goBackButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  showGreetings();
});
