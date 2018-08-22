export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  score: 0,
  time: 0,
};

const ANSWERS_COUNT = 10;
const ANSWER_SCORE = 100;
const FAST_ANSWER_SCORE = 50;
const SLOW_ANSWER_SCORE = -50;
const REST_LIVE_SCORE = 50;
const FAST_ANSWER_TIME = 10;
const SLOW_ANSWER_TIME = 20;
const MAX_LIVES_COUNT = 3;
const MAX_TIME = 30;
const MAX_LEVEL = 9;

export const checkScores = (game, ans = [], lives) => {
  if (ans.length < ANSWERS_COUNT) {
    return -1;
  }

  if (ans.length > ANSWERS_COUNT && lives === 3 && ans.every((a)=>{
    return a.time > FAST_ANSWER_TIME && a.time < SLOW_ANSWER_SCORE;
  })) {
    return Object.assign({}, game, {score: 1150});
  }

  let score = ans.reduce((a, b) => {
    if (b.answer === false) {
      return a + 0;
    }
    if (b.time < FAST_ANSWER_TIME) {
      return a + ANSWER_SCORE + FAST_ANSWER_SCORE;
    } else if (b.time > SLOW_ANSWER_TIME) {
      return a + ANSWER_SCORE + SLOW_ANSWER_SCORE;
    }
    return a + ANSWER_SCORE;
  }, 0) + REST_LIVE_SCORE * lives;

  return Object.assign({}, game, {score});
};

const check = (propType, maxLength, game, prop) => {
  if (typeof prop !== `number`) {
    throw new Error(`${propType} should be number`);
  }

  if (prop < 0) {
    throw new Error(`${propType} should not be negative`);
  }

  if (prop > maxLength) {
    throw new Error(`${propType} should not be greater then ${maxLength}`);
  }

  switch (propType) {
    case `Lives`:
      return Object.assign({}, game, {lives: prop});
    case `Time`:
      return Object.assign({}, game, {time: prop});
    case `Level`:
      return Object.assign({}, game, {level: prop});
    default:
      return game;
  }
};

export const checkLives = check.bind(null, `Lives`, MAX_LIVES_COUNT);
export const checkTime = check.bind(null, `Time`, MAX_TIME);
export const checkLevel = check.bind(null, `Level`, MAX_LEVEL);
