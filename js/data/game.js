export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: [],
});

export const DEBUG = true;

export const ANSWERS_COUNT = 10;
export const FAST_ANSWER_TIME = 20;
export const SLOW_ANSWER_TIME = 9;
const MAX_LEVEL = 9;
export const WRONG_ANSWER = -1;
export const ONE_SECOND = 1000;
export const TIME_LEFT = 5;
export const HALF_SECOND = 500;
export const NO_LIVES = -1;
export const GAME_FAIL = -1;
export const RIGHT_ANSWER_MULTIPLIER = 100;
export const FAST_ANSWER_MULTIPLIER = 50;
export const SLOW_ANSWER_MULTIPLIER = 50;
export const LIVES_MULTIPLIER = 50;
export const RIGHT_ANSWER = 1;

export const setLevel = (lvl) => {
  if (typeof lvl !== `number`) {
    throw new Error(`Level should be number`);
  }

  if (lvl > MAX_LEVEL) {
    return GAME_FAIL;
  }

  if (lvl < 0) {
    throw new Error(`Level should not be negative`);
  }

  return lvl;
};

export const tick = (state) => {
  return Object.assign({}, state, {time: state.time - 1});
};

export const endTime = (state) => {
  return state.time < 0;
};

export const die = (state) => {
  return Object.assign({}, state, {lives: state.lives - 1, answers: [...state.answers, WRONG_ANSWER]});
};

export const changeLevel = (state, level) => {
  return Object.assign({}, state, {time: INITIAL_STATE.time, level});
};

export const updateAnswers = (state) => {
  return Object.assign({}, state, {answers: [...state.answers, state.time]});
};

