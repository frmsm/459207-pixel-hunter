import {FAST_ANSWER_TIME, RESULTS, SLOW_ANSWER_TIME} from "./game";

export const countAnswers = (state) => {
  let answerStatistic = {};
  if (state.lives < 0) {
    answerStatistic = {
      answers: state.answers,
      lives: -1
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
      answerStatistic.answer += 1;
      answerStatistic.fast += 1;
    }
    if (answer < SLOW_ANSWER_TIME && answer > -1) {
      answerStatistic.answer += 1;
      answerStatistic.slow += 1;
    }
  }

  return answerStatistic;
};

export const countScores = (statistic) => {
  if (statistic.lives < 0) {
    return {total: -1};
  }
  const answer = statistic.answer * 100;
  const fast = statistic.fast * 50;
  const slow = statistic.slow * 50;
  const lives = statistic.lives * 50;
  const score = {
    answer,
    fast,
    slow,
    lives,
    total: answer + fast + lives - slow,
  };
  return score;
};

export const pushResults = (state) => {
  const statistic = countAnswers(state);
  const score = countScores(statistic);
  RESULTS.push({statistic, score});
};


