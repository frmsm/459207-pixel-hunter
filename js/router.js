import {main} from "./main";
import ErrorScreen from "./controllers/error-screen";
import WelcomeScreen from "./controllers/welcome-screen";
import GreetingsScreen from "./controllers/greetings-screen";
import LoaderScreen from "./controllers/loader-screen";
import RulesScreen from "./controllers/rules-screen";
import StatsScreen from "./controllers/stats-screen";
import GameModel from "./game-model";
import LevelScreen from "./controllers/level-screen";
import {getImagesArray} from "./data/load-images";
import ModalScreen from "./controllers/modal-screen";
import Loader from "./data/load-data";
import {pushResults} from "./data/scores";

let gameData;
let images = {};

const updateScreen = (...view) => {
  main.innerHTML = ``;
  for (let element of [...view]) {
    main.appendChild(element);
  }
};

export default class Router {
  static showWelcome() {
    const intro = new WelcomeScreen();
    const greetings = new GreetingsScreen();
    updateScreen(intro.element, greetings.element);
  }

  static showGreetings() {
    const greet = new GreetingsScreen();
    updateScreen(greet.element);
  }

  static showGame(playerName) {
    Router.showLevel(new GameModel(playerName, gameData, images));
  }

  static showLevel(model) {
    const game = new LevelScreen(model);
    updateScreen(game.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    updateScreen(rules.element);
  }

  static showStats(model) {
    Loader.saveResults(model.state, model.playerName)
      .then(() => Loader.loadResults(model.playerName))
      .then((data) => {
        return pushResults(data);
      })
      .then((data)=>{
        const stats = new StatsScreen(data);
        updateScreen(stats.element);
      })
      .catch(Router.showError);
  }

  static showError() {
    const error = new ErrorScreen();
    updateScreen(error.element);
  }

  static showModal(stopGame) {
    const modal = new ModalScreen(stopGame);
    main.appendChild(modal.element);
  }

  static showLoader() {
    const loader = new LoaderScreen();
    updateScreen(loader.element);
    Loader.loadData()
      .then((data)=>{
        gameData = data;
        return getImagesArray(data, images);
      })
      .then((promises)=>Promise.all(promises))
      .then(()=>Router.showWelcome())
      .catch(()=>Router.showError());
  }
}
