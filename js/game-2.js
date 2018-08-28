import {checkQuestion, getElementFromTemplate, selectScreen} from "./utils";
import {renderGameThree, showGameThree} from "./game-3";
import {showGreetings} from "./greeting";
import {backButton} from "./back-button";
import {gameHeader, startTimer} from "./game-header";
import {gameRender, setQuestionStyle, shouldLevelRender} from "./game-render";
import {INITIAL_STATE, PIXEL_HUNTER, setLevel, setLives} from "./data/game";
import {curStats} from "./current-stats";

const tmp = (state) => `<header class="header">
    ${backButton}
    ${gameHeader(state)}
  </header>
  <section class="game">
    <p class="game__task">${PIXEL_HUNTER[state.level].question}</p>
    <form class="game__content game__content--wide">
      ${gameRender(PIXEL_HUNTER[state.level], `705`, `455`)}
    </form>
    ${curStats(state.answers)}
  </section>`;

export const renderGameTwo = (state) => {
  const gameTwo = getElementFromTemplate(tmp(state));

  const gameContent = gameTwo.querySelector(`.game__content`);
  const questionOne = gameTwo.querySelectorAll(`[name='question1']`);

  const answers = PIXEL_HUNTER[state.level].answers;

  gameContent.addEventListener(`click`, () => {
    const q1 = checkQuestion(questionOne);
    if (q1) {
      clearInterval(timer);
      if (q1 === answers[0].type) {
        shouldLevelRender(state, Number(gameTimer.innerHTML));
      } else {
        // // renderGameThree(Object.assign({}, state, {level: state.level + 1}));
        // const newState = Object.assign({}, state, {level: setLevel(state.level)});
        // setQuestionStyle(newState);
        shouldLevelRender(state, -1, setLives(state.lives));
      }
    }
  });

  const goBackButton = gameTwo.querySelector(`.back`);
  goBackButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    showGreetings();
  });

  selectScreen(gameTwo);

  const gameTimer = gameTwo.querySelector(`.game__timer`);
  // startTimer(gameTimer, state);
  const timer = setInterval((() => {
    console.log(gameTimer.innerHTML);
    gameTimer.innerHTML--;
    if (Number(gameTimer.innerHTML) < 6) {
      gameTimer.style.color = `red`;
      setTimeout(()=>{
        gameTimer.style.color = `black`;
      }, 500);
    }
    if (gameTimer.innerHTML === `0`) {
      clearInterval(timer);
      shouldLevelRender(state, -1, setLives(state.lives));
    }
  }), 1000);

};


