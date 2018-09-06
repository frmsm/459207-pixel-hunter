import GameOne from "./Screens/game-one-screen";
import {INITIAL_STATE, ONE_SECOND, PIXEL_HUNTER, RESULTS, setLevel, setLives, WRONG_ANSWER} from "./data/game";
import BackButton from "./Screens/header/back-button-component";
import {main} from "./main";
import GameTwo from "./Screens/game-two-screen";
import GameThree from "./Screens/game-three-screen";
import Greetings from "./Screens/greetings-screen";
import {pushResults} from "./data/scores";
import StatsScreen from "./Screens/stats-screen";
import Rules from "./Screens/rules-screen";
import IntroScreen from "./Screens/Welcome";
import {gameHeader} from "./Screens/header/game-header";
import {getElementFromTemplate} from "./utils";
import GameLives from "./Screens/header/live";
import GameTimer from "./Screens/header/time";

let gameTime = INITIAL_STATE.time;
let timer;

const startTimer = (state) => {
  timer = setTimeout(() => {
    tick(state);
  }, ONE_SECOND);
};

const stopTimer = () => {
  clearTimeout(timer);
  gameTime = INITIAL_STATE.time;
};

const tick = (state) => {
  if (gameTime === 25) {
    stopTimer();
    levelRender(state, WRONG_ANSWER, setLives(state.lives - 1));
  } else {
    updateView(time, new GameTimer(--gameTime));
    startTimer(state);
  }
};

const render = (template = ``) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const updateView = (container, ...view) => {
  container.innerHTML = ``;
  [...view].forEach((it) => {
    container.appendChild(it.element);
  });
};

const gameContainerElement = render();
const headerElement = getElementFromTemplate(gameHeader()).firstElementChild;
const levelElement = render();

const back = render();
const time = render();
const live = render();

gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);

const levelRender = (state, answer = null, lives = state.lives) => {
  if (!answer) {
    setGameType(state);
    return;
  }
  const newState = Object.assign({}, state,
      {level: setLevel(state.level + 1),
        answers: [...state.answers, answer],
        lives});
  if (newState.level && newState.lives > -1) {
    setGameType(newState);
  } else {
    pushResults(newState);
    renderStats();
  }
};

export const setGameType = (state) => {
  const images = PIXEL_HUNTER[state.level].answers.length;
  const gameTypes = {
    1: GameTwo,
    2: GameOne,
    3: GameThree
  };
  gameScreenRender(state, gameTypes[images]);
};

const gameScreenRender = (state, Game) => {
  const newGame = new Game(PIXEL_HUNTER[state.level], state.answers);
  startTimer(state);
  newGame.onAnswer = (answer) => {
    stopTimer();
    if (answer) {
      levelRender(state, gameTime);
    } else {
      levelRender(state, WRONG_ANSWER, setLives(state.lives - 1));
    }
  };
  const backEl = new BackButton(state);
  const timeEl = new GameTimer(INITIAL_STATE.time);
  const liveEl = new GameLives(state);
  backEl.onClick = () => {
    greetingsScreenRender();
    stopTimer();
  };
  main.innerHTML = ``;
  updateView(back, backEl);
  updateView(time, timeEl);
  updateView(live, liveEl);
  headerElement.innerHTML = ``;
  headerElement.appendChild(back);
  headerElement.appendChild(time);
  headerElement.appendChild(live);
  updateView(levelElement, newGame);
  main.appendChild(headerElement);
  main.appendChild(gameContainerElement);
};

const greetingsScreenRender = () => {
  const greeting = new Greetings();
  greeting.onClick = () => {
    renderRules();
  };
  main.innerHTML = ``;
  main.appendChild(greeting.element);
};

const renderStats = () => {
  const stats = new StatsScreen(RESULTS);
  const header = new BackButton();
  header.onClick = () => {
    greetingsScreenRender();
    stopTimer();
  };
  main.innerHTML = ``;
  updateView(headerElement, header);
  main.appendChild(headerElement);
  main.appendChild(stats.element);
};

const renderRules = () => {
  const rules = new Rules();
  rules.onClick = () => {
    levelRender(INITIAL_STATE);
  };
  const header = new BackButton();
  header.onClick = () => {
    greetingsScreenRender();
    stopTimer();
  };
  main.innerHTML = ``;
  updateView(headerElement, header);
  main.appendChild(headerElement);
  main.appendChild(rules.element);
};

export const renderWelcome = () => {
  const intro = new IntroScreen();
  intro.onClick = () => {
    greetingsScreenRender();
  };
  main.innerHTML = ``;
  main.appendChild(intro.element);
};

