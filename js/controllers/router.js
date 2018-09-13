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
import Loader from "../data/load-data";
import {pushResults} from "../data/scores";

let gameData;
let images = {};

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
    intro.click();
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

  static showStats(model) {
    Loader.saveResults(model.state, model.playerName)
      .then(() => Loader.loadResults(model.playerName))
      .then((data) => {
        return pushResults(data);
      })
      .then((data)=>{
        const stats = new StatsScreen(data);
        updateScreen(main, stats.element);
      })
      .catch(Router.showError);
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
    Loader.loadData()
      .then((data)=>{
        gameData = data;
        return getImagesArray(data, images);
      })
      .then((promises)=>Promise.all(promises))
      .then(()=>Router.showWelcome())
      .catch(loader.onError);
  }
}
