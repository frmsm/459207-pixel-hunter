import {assert} from 'chai';
import {isValidLevel, isValidLives, checkScores, isValidTime} from "./game";

const answers1 = [{answer: true, time: 18}, {answer: true, time: 16}, {answer: true, time: 12}, {answer: true, time: 15}, {answer: true, time: 12}, {answer: true, time: 17}, {answer: true, time: 11}, {answer: true, time: 19}, {answer: true, time: 15}, {answer: true, time: 13}];
const answers2 = [{answer: true, time: 18}, {answer: true, time: 16}, {answer: true, time: 12}, {answer: true, time: 15}, {answer: true, time: 12}, {answer: true, time: 17}, {answer: true, time: 11}];
const answers3 = [{answer: true, time: 18}, {answer: false, time: 16}, {answer: true, time: 3}, {answer: true, time: 22}, {answer: true, time: 22}, {answer: true, time: 17}, {answer: true, time: 11}, {answer: true, time: 19}, {answer: true, time: 9}, {answer: true, time: 13}];

describe(`check scores`, () => {
  it(`should show scores`, () => {
    assert.equal(checkScores(answers1, 3), 1150);
    assert.equal(checkScores(answers1, 2), 1100);
    assert.equal(checkScores(answers2, 3), -1);
    assert.equal(checkScores(answers3, 3), 1050);
  });
});

describe(`check lives`, () => {
  it(`should lives change`, () => {
    assert.equal(isValidLives(2), true);
    assert.equal(isValidLives(0), true);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => isValidLives(-1),
        /Lives should not be negative/);
  });
});

describe(`check time`, () => {
  it(`should time change`, () => {
    assert.equal(isValidTime(10), true);
    assert.equal(isValidTime(0), true);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => isValidTime(-1),
        /Time should not be negative/);
  });
});

describe(`check level`, () => {
  it(`should level change`, () => {
    assert.equal(isValidLevel(5), true);
    assert.equal(isValidLevel(0), true);
  });
  it(`should not be lower then 0`, () => {
    assert.throws(() => isValidLevel(-1),
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
