import {main} from "../main";
import {ErrorScreen, GreetingsScreen, LoaderScreen, RulesScreen, StatsScreen, WelcomeScreen} from "./app-screens";
import QuestModel from "../game-model";
import LevelScreen from "./level-screen";

const OK_STATUS = 200;
const REDIRECTION_STATUS = 300;

const loadData = (view) => {
  fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => {
      gameData = data;
    })
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
    Router.showLevel(new QuestModel(playerName, gameData));
  }

  static showLevel(model) {
    const game = new LevelScreen(model);
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
