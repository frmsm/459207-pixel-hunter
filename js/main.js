import Router from "./controllers/router";

export const main = document.getElementById(`main`);

const startGame = () => {
  Router.showLoader();
};

startGame();
