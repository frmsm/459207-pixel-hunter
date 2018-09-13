import {INITIAL_STATE, NO_TIME, ONE_LIVE, TIMER_SECOND, WRONG_ANSWER} from "./game";

export default class StateUpdater {
  static tick(state) {
    return Object.assign({}, state, {time: state.time - TIMER_SECOND});
  }

  static checkTimeEnd(state) {
    return state.time <= NO_TIME;
    ;
  }

  static die(state) {
    return Object.assign({}, state, {lives: state.lives - ONE_LIVE, answers: [...state.answers, WRONG_ANSWER]});
  }

  static changeLevel(state, level) {
    return Object.assign({}, state, {time: INITIAL_STATE.time, level});
  }

  static updateAnswersArray(state) {
    return Object.assign({}, state, {answers: [...state.answers, state.time]});
  }
}
