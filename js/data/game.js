export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: [],
});

export const PIXEL_HUNTER = {
  'level-1': {
    photoPaint: true,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
  },
  'level-2': {
    photoPaint: true,
    question: `Угадай, фото или рисунок?`,
    answers: [`http://placehold.it/705x455`]
  },
  'level-3': {
    photoPaint: false,
    question: `Найдите рисунок среди изображений`,
    answers: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`]
  }
};

// const RESUTS = [];

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

export const checkScores = (answers = [], lives) => {
  if (answers.length < ANSWERS_COUNT) {
    return -1;
  }

  const score = answers.reduce((sum, answer) => {
    if (answer.answer === false) {
      return sum;
    }
    sum += ANSWER_SCORE;
    if (answer.time < FAST_ANSWER_TIME) {
      return sum + FAST_ANSWER_SCORE;
    }
    if (answer.time > SLOW_ANSWER_TIME) {
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

