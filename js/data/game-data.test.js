import {assert} from 'chai';
import {checkLevel, checkLives, checkScores, checkTime, INITIAL_GAME} from "./game";

const answers1 = [{answer: true, time: 18}, {answer: true, time: 16}, {answer: true, time: 12}, {answer: true, time: 15}, {answer: true, time: 12}, {answer: true, time: 17}, {answer: true, time: 11}, {answer: true, time: 19}, {answer: true, time: 15}, {answer: true, time: 13}];
const answers2 = [{answer: true, time: 18}, {answer: true, time: 16}, {answer: true, time: 12}, {answer: true, time: 15}, {answer: true, time: 12}, {answer: true, time: 17}, {answer: true, time: 11}];
const answers3 = [{answer: true, time: 18}, {answer: false, time: 16}, {answer: true, time: 3}, {answer: true, time: 22}, {answer: true, time: 22}, {answer: true, time: 17}, {answer: true, time: 11}, {answer: true, time: 19}, {answer: true, time: 9}, {answer: true, time: 13}];

describe(`check scores`, () => {
  it(`should show scores`, () => {
    assert.equal(checkScores(INITIAL_GAME, answers1, 3).score, 1150);
    assert.equal(checkScores(INITIAL_GAME, answers1, 2).score, 1100);
    assert.equal(checkScores(INITIAL_GAME, answers2, 3), -1);
    assert.equal(checkScores(INITIAL_GAME, answers3, 3).score, 1050);
  });
});

describe(`check lives`, () => {
  it(`should lives change`, () => {
    assert.equal(checkLives(INITIAL_GAME, 2).lives, 2);
    assert.equal(checkLives(INITIAL_GAME, 0).lives, 0);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => checkLives(INITIAL_GAME, -1).lives,
        /Lives should not be negative/);
  });
});

describe(`check time`, () => {
  it(`should time change`, () => {
    assert.equal(checkTime(INITIAL_GAME, 10).time, 10);
    assert.equal(checkTime(INITIAL_GAME, 0).time, 0);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => checkTime(INITIAL_GAME, -1).time,
        /Time should not be negative/);
  });
});

describe(`check level`, () => {
  it(`should level change`, () => {
    assert.equal(checkLevel(INITIAL_GAME, 5).level, 5);
    assert.equal(checkLevel(INITIAL_GAME, 0).level, 0);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => checkLevel(INITIAL_GAME, -1).level,
        /Level should not be negative/);
  });
});

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

