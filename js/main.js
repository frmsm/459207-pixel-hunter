
import {renderWelcome} from "./screen-render";

export const main = document.getElementById(`main`);

const startGame = () => {
  renderWelcome();
};

startGame();
