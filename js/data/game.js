export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: [],
});

export const RESULTS = [];

export const ANSWERS_COUNT = 10;
const ANSWER_SCORE = 100;
const FAST_ANSWER_SCORE = 50;
const SLOW_ANSWER_SCORE = -50;
const REST_LIVE_SCORE = 50;
export const FAST_ANSWER_TIME = 20;
export const SLOW_ANSWER_TIME = 10;
const MAX_LIVES_COUNT = 3;
const MAX_TIME = 30;
const MAX_LEVEL = 9;
export const WRONG_ANSWER = -1;
export const ONE_SECOND = 1000;


export const checkScores = (answers = [], lives) => {
  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }

  const score = answers.reduce((sum, answer) => {
    if (answer.answer === false) {
      return sum;
    }
    sum += ANSWER_SCORE;
    if (answer.time > FAST_ANSWER_TIME) {
      return sum + FAST_ANSWER_SCORE;
    }
    if (answer.time < SLOW_ANSWER_TIME && answer.time > -1) {
      return sum + SLOW_ANSWER_SCORE;
    }
    return sum;
  }, 0) + REST_LIVE_SCORE * lives;

  return score;
};

const isValid = (propType, maxLength, prop) => {
  if (typeof prop !== `number`) {
    throw new Error(`${propType} should be number`);
  }

  if (prop < 0) {
    throw new Error(`${propType} should not be negative`);
  }

  if (prop > maxLength) {
    throw new Error(`${propType} should not be greater then ${maxLength}`);
  }

  return true;
};

export const isValidLives = isValid.bind(null, `Lives`, MAX_LIVES_COUNT);
export const isValidTime = isValid.bind(null, `Time`, MAX_TIME);
export const isValidLevel = isValid.bind(null, `Level`, MAX_LEVEL);

export const setLevel = (lvl) => {
  if (typeof lvl !== `number`) {
    throw new Error(`Level should be number`);
  }

  if (lvl > MAX_LEVEL) {
    return -1;
  }

  if (lvl < 0) {
    throw new Error(`Level should not be negative`);
  }

  return lvl;
};

export const setLives = (live) => {
  if (live < 0) {
    return -1;
  }

  return live;
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

