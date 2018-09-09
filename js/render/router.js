import {main} from "../main";
import {GreetingsScreen, RulesScreen, StatsScreen, WelcomeScreen} from "./app-screens";
import QuestModel from "../game-model";
import LevelScreen from "./level-screen";

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
    const game = new LevelScreen(new QuestModel(playerName));
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
}
