
import IntroScreen from "../Screens/static-screens/Welcome";
import Greetings from "../Screens/static-screens/greetings-screen";

import Router from "./router";
import BackButton from "../Screens/header/back-button-component";
import Rules from "../Screens/rules-screen";
import {RESULTS} from "../data/game";
import StatsView from "../Screens/stats-screen";


export class WelcomeScreen {
  constructor() {
    this.intro = new IntroScreen();
    this.intro.onClick = this.click.bind(this);
  }

  get element() {
    return this.intro.element;
  }

  click() {
    Router.showGreetings();
  }
}

export class GreetingsScreen {
  constructor() {
    this.greet = new Greetings();
    this.greet.onClick = this.click.bind(this);
  }

  get element() {
    return this.greet.element;
  }

  click() {
    Router.showRules();
  }
}

export class HeaderPart {
  constructor(stopTimer = null) {
    this.header = new BackButton();
    this.stopTimer = stopTimer;
    this.header.onClick = this.click.bind(this);
  }

  get element() {
    return this.header.element.firstElementChild;
  }

  click() {
    if (this.stopTimer) {
      this.stopTimer();
    }
    Router.showGreetings();
  }
}

export class RulesScreen {
  constructor() {
    this.header = new HeaderPart();
    this.rules = new Rules();

    this.rules.onClick = this.click.bind(this);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.rules.element);
  }

  get element() {
    return this.root;
  }

  click(name) {
    Router.showGame(name);
  }
}

export class StatsScreen {
  constructor() {
    this.stats = new StatsView(RESULTS);
    this.header = new HeaderPart();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.stats.element);
  }

  get element() {
    return this.root;
  }
}
