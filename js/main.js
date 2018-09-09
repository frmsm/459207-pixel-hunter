import Router from "./render/router";

export const main = document.getElementById(`main`);

const startGame = () => {
  Router.showWelcome();
};

startGame();
