import {
  FAST_ANSWER_MULTIPLIER,
  FAST_ANSWER_TIME,
  GAME_FAIL, LIVES_MULTIPLIER,
  NO_LIVES, RIGHT_ANSWER, RIGHT_ANSWER_MULTIPLIER, SLOW_ANSWER_MULTIPLIER,
  SLOW_ANSWER_TIME,
  WRONG_ANSWER
} from "./game";

export const countAnswers = (state) => {
  let answerStatistic = {};
  if (state.lives === NO_LIVES) {
    answerStatistic = {
      answers: state.answers,
      lives: NO_LIVES
    };
    return answerStatistic;
  }

  answerStatistic = {
    answers: state.answers,
    answer: 0,
    fast: 0,
    slow: 0,
    lives: state.lives,
  };

  for (const answer of state.answers) {
    if (answer >= FAST_ANSWER_TIME) {
      answerStatistic.answer += RIGHT_ANSWER;
      answerStatistic.fast += RIGHT_ANSWER;
    }
    if (answer <= SLOW_ANSWER_TIME && answer > WRONG_ANSWER) {
      answerStatistic.answer += RIGHT_ANSWER;
      answerStatistic.slow += RIGHT_ANSWER;
    }
  }

  return answerStatistic;
};

export const countScores = (statistic) => {
  if (statistic.lives === NO_LIVES) {
    return {total: GAME_FAIL};
  }
  const answer = statistic.answer * RIGHT_ANSWER_MULTIPLIER;
  const fast = statistic.fast * FAST_ANSWER_MULTIPLIER;
  const slow = statistic.slow * SLOW_ANSWER_MULTIPLIER;
  const lives = statistic.lives * LIVES_MULTIPLIER;
  return {
    answer,
    fast,
    slow,
    lives,
    total: answer + fast + lives - slow,
  };
};

export const pushResults = (state) => {
  return state.map((answers) => {
    const statistic = countAnswers(answers);
    const score = countScores(statistic);
    return {statistic, score};
  });
};


