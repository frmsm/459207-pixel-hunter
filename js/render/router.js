import {main} from "../main";
import {ErrorScreen, GreetingsScreen, LoaderScreen, RulesScreen, StatsScreen, WelcomeScreen} from "./app-screens";
import QuestModel from "../game-model";
import LevelScreen from "./level-screen";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

const updateScreen = (container, ...view) => {
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
    const game = new LevelScreen(new QuestModel(playerName, gameData));
    updateScreen(main, game.element);
    game.startGame();
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
    fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        gameData = data;
      })
      .then(() => loader.nextScreen())
      .catch(() => loader.error());
  }
}
