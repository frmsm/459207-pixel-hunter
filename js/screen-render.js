import GameOne from "./Screens/game-one-screen";
import {INITIAL_STATE, PIXEL_HUNTER, RESULTS, setLevel, setLives} from "./data/game";
import BackButton from "./Screens/back-button-component";
import {main} from "./main";
import GameTwo from "./Screens/game-two-screen";
import GameThree from "./Screens/game-three-screen";
import Greetings from "./Screens/greetings-screen";
import {pushResults} from "./data/scores";
import StatsScreen from "./Screens/stats-screen";
import Rules from "./Screens/rules-screen";
import IntroScreen from "./Screens/Welcome";

const levelRender = (state, answer = -1, lives = state.lives) => {
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
  const answersLength = PIXEL_HUNTER[state.level].answers.length;
  switch (answersLength) {
    case 3:
      gameThreeScreenRender(state);
      break;
    case 1:
      gameTwoScreenRender(state);
      break;
    case 2:
      gameOneScreenRender(state);
      break;
    default:
      greetingsScreenRender();
  }
};

const gameScreenRender = (state, game) => {
  game.onAnswer = (answer) => {
    if (answer) {
      levelRender(state, 20);
    } else {
      levelRender(state, -1, setLives(state.lives - 1));
    }
  };
  const header = new BackButton(state);
  header.onClick = () => {
    greetingsScreenRender();
  };
  main.innerHTML = ``;
  main.appendChild(header.element);
  main.appendChild(game.element);
};

export const gameOneScreenRender = (state) => {
  const game = new GameOne(PIXEL_HUNTER[state.level], state.answers);
  gameScreenRender(state, game);
};

export const gameTwoScreenRender = (state) => {
  const game = new GameTwo(PIXEL_HUNTER[state.level], state.answers);
  gameScreenRender(state, game);
};

export const gameThreeScreenRender = (state) => {
  const game = new GameThree(PIXEL_HUNTER[state.level], state.answers);
  gameScreenRender(state, game);
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
  };
  main.innerHTML = ``;
  main.appendChild(header.element);
  main.appendChild(stats.element);
};

const renderRules = () => {
  const rules = new Rules();
  rules.onClick = () => {
    setGameType(INITIAL_STATE);
  };
  const header = new BackButton();
  header.onClick = () => {
    greetingsScreenRender();
  };
  main.innerHTML = ``;
  main.appendChild(header.element);
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


