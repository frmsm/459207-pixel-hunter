import Router from "./constrollers/router";

export const main = document.getElementById(`main`);

const startGame = () => {
  Router.showLoader();
};

startGame();
