export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: [],
});

export const Multiplier = {
  LIVES: 50,
  Answer: {
    RIGHT: 100,
    FAST: 50,
    SLOW: 50,
    TYPE: 50,
  }
};

export const AnswerTime = {
  FAST: 20,
  SLOW: 9
};

export const DEBUG = true;

export const ANSWERS_COUNT = 10;
export const RIGHT_ANSWER = 1;
export const WRONG_ANSWER = -1;
export const MAX_LEVEL = 9;
export const ONE_SECOND = 1000;
export const HALF_SECOND = 500;
export const TIME_LEFT = 5;
export const NO_LIVES = -1;
export const NO_TIME = -1;
export const GAME_FAIL = -1;
export const ADD_LEVEL = 1;
export const ONE_LIVE = 1;
export const TIMER_SECOND = 1;


