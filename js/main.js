import Router from "./render/router";

export const main = document.getElementById(`main`);

const startGame = () => {
  Router.showLoader();
};

startGame();
