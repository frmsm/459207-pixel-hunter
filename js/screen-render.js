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
import GameLives from "./Screens/header/live";
import GameTimer from "./Screens/header/time";
// timer
let gameTime = INITIAL_STATE.time;
let timer;

// Создать переменную и присвоить её state, и в ней работать с таймером

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

// timer /

// rendering functions
const render = (template = ``) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

const updateScreen = (container, ...view) => {
  container.innerHTML = ``;
  [...view].forEach((it) => {
    container.appendChild(it);
  });
};
//

// container functions
const gameContainerElement = render();
const headerElement = render(gameHeader).firstElementChild;
const levelElement = render();

const back = render();
const time = render();
const live = render();

gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
// /


// screen render
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
  renderBackButton();
  renderTimer(state);
  renderLive(state);
  updateScreen(headerElement, back, time, live);
  updateView(levelElement, newGame);
  updateScreen(gameContainerElement, headerElement, levelElement);
};

const renderTimer = (state) => {
  const timerEl = new GameTimer(state.time);
  updateView(time, timerEl);
};

const renderLive = (state) => {
  const liveEl = new GameLives(state);
  updateView(live, liveEl);
};
// /

const greetingsScreenRender = () => {
  const greeting = new Greetings();
  greeting.onClick = () => {
    renderRules();
  };
  updateView(levelElement, greeting);
  updateScreen(gameContainerElement, levelElement);
};

const renderStats = () => {
  const stats = new StatsScreen(RESULTS);
  renderBackButton();
  updateScreen(headerElement, back);
  updateView(levelElement, stats);
  updateScreen(gameContainerElement, headerElement, levelElement);
};

const renderRules = () => {
  const rules = new Rules();
  rules.onClick = () => {
    levelRender(INITIAL_STATE);
  };
  renderBackButton();
  updateScreen(headerElement, back);
  updateView(levelElement, rules);
  updateScreen(gameContainerElement, headerElement, levelElement);
};

const renderBackButton = () => {
  const header = new BackButton();
  header.onClick = () => {
    greetingsScreenRender();
    stopTimer();
  };
  updateView(back, header);
};

export const renderWelcome = () => {
  const intro = new IntroScreen();
  intro.onClick = () => {
    greetingsScreenRender();
  };
  updateView(gameContainerElement, intro);
  updateScreen(main, gameContainerElement);
};


