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

export const checkLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Live should be number`);
  }

  if (lives < 0) {
    throw new Error(`Lives should not be negative`);
  }

  if (lives > MAX_LIVES_COUNT) {
    throw new Error(`Lives should not be greather then ${MAX_LIVES_COUNT}`);
  }

  return Object.assign({}, game, {lives});
};


export const checkTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be number`);
  }

  if (time < 0) {
    throw new Error(`Time should not be negative`);
  }

  if (time > MAX_TIME) {
    throw new Error(`Time shoul not be greather then ${MAX_TIME}`);
  }

  return Object.assign({}, game, {time});
};

export const checkLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative`);
  }

  if (level > MAX_LEVEL) {
    throw new Error(`Level shoul not be greather then ${MAX_LEVEL}`);
  }

  return Object.assign({}, game, {level});
};
