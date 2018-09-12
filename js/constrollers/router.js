import {main} from "../main";
import ErrorScreen from "./error";
import WelcomeScreen from "./welcome";
import GreetingsScreen from "./greetings";
import LoaderScreen from "./loader";
import RulesScreen from "./rules";
import StatsScreen from "./stats";
import GameModel from "../game-model";
import Level from "./level";
import {getImagesArray} from "../load-images";

const OK_STATUS = 200;
const REDIRECTION_STATUS = 300;

const loadData = (view) => {
  fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => {
      gameData = data;
      return getImagesArray(data);
    })
    .then((arr)=>Promise.all(arr))
    .then(() => view.nextScreen())
    .catch(() => view.error());
};

const checkStatus = (response) => {
  if (response.status >= OK_STATUS && response.status < REDIRECTION_STATUS) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

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
    Router.showLevel(new GameModel(playerName, gameData));
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

  static showLoader() {
    const loader = new LoaderScreen();
    updateScreen(main, loader.element);
    loadData(loader);
  }
}
