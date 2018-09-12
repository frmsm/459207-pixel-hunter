import {main} from "../main";
import ErrorScreen from "./error";
import WelcomeScreen from "./welcome";
import GreetingsScreen from "./greetings";
import LoaderScreen from "./loader";
import RulesScreen from "./rules";
import StatsScreen from "./stats";
import GameModel from "../game-model";
import Level from "./level";
import {getImagesArray} from "../data/load-images";
import ModalScreen from "./modal";

const OK_STATUS = 200;
const REDIRECTION_STATUS = 300;

const loadData = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => {
      gameData = data;
      return getImagesArray(data);
    })
    .then((promises)=>Promise.all(promises));
};

const checkStatus = (response) => {
  if (response.status >= OK_STATUS && response.status < REDIRECTION_STATUS) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


let gameData;
export let images = {};

export const updateScreen = (container, ...view) => {
  container.innerHTML = ``;
  [...view].forEach((it) => {
    container.appendChild(it);
  });
};

export default class Router {
  static showWelcome() {
    const intro = new WelcomeScreen();
    updateScreen(main, intro.element);
  }

  static showGreetings() {
    const greet = new GreetingsScreen();
    updateScreen(main, greet.element);
  }

  static showGame(playerName) {
    Router.showLevel(new GameModel(playerName, gameData, images));
  }

  static showLevel(model) {
    const game = new Level(model);
    updateScreen(main, game.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    updateScreen(main, rules.element);
  }

  static showStats() {
    const stats = new StatsScreen();
    updateScreen(main, stats.element);
  }

  static showError() {
    const error = new ErrorScreen();
    updateScreen(main, error.element);
  }

  static showModal(stopGame) {
    const modal = new ModalScreen(stopGame);
    main.appendChild(modal.element);
  }

  static showLoader() {
    const loader = new LoaderScreen();
    updateScreen(main, loader.element);
    loadData(`https://es.dump.academy/pixel-hunter/questions`)
      .then(loader.nextScreen)
      .catch(loader.onError);
  }
}
