
import IntroView from "../Screens/static-screens/Welcome";
import GreetingsView from "../Screens/static-screens/greetings-view";

import Router from "./router";
import BackButtonView from "../Screens/header/back-button";
import RulesView from "../Screens/rules-view";
import {RESULTS} from "../data/game";
import StatsView from "../Screens/stats-view";
import LoaderView from "../Screens/static-screens/load-view";
import ErrorView from "../Screens/static-screens/error-view";


export class WelcomeScreen {
  constructor() {
    this.intro = new IntroView();
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
    this.greet = new GreetingsView();
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
    this.header = new BackButtonView();
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
    this.rules = new RulesView();

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

export class LoaderScreen {
  constructor() {
    this.loader = new LoaderView();
  }

  get element() {
    return this.loader.element;
  }

  nextScreen() {
    Router.showWelcome();
  }

  error() {
    Router.showError();
  }
}

export class ErrorScreen {
  constructor() {
    this.error = new ErrorView();
  }

  get element() {
    return this.error.element;
  }
}
