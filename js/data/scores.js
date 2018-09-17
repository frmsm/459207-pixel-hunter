import {
  AnswerTime,
  GAME_FAIL, Multiplier,
  NO_LIVES, RIGHT_ANSWER,
  WRONG_ANSWER
} from "./game";

const countAnswers = (state) => {
  const NO_ANSWERS = 0;
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
    answer: NO_ANSWERS,
    fast: NO_ANSWERS,
    slow: NO_ANSWERS,
    lives: state.lives,
  };

  for (const answer of state.answers) {
    if (answer >= AnswerTime.FAST) {
      answerStatistic.answer += RIGHT_ANSWER;
      answerStatistic.fast += RIGHT_ANSWER;
    }
    if (answer <= AnswerTime.SLOW && answer > WRONG_ANSWER) {
      answerStatistic.answer += RIGHT_ANSWER;
      answerStatistic.slow += RIGHT_ANSWER;
    }
  }

  return answerStatistic;
};

const countScores = (statistic) => {
  if (statistic.lives === NO_LIVES) {
    return {total: GAME_FAIL};
  }
  const answer = statistic.answer * Multiplier.Answer.RIGHT;
  const fast = statistic.fast * Multiplier.Answer.FAST;
  const slow = statistic.slow * Multiplier.Answer.SLOW;
  const lives = statistic.lives * Multiplier.LIVES;
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


