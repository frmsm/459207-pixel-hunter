import {main} from "./main";
//import {setQuestionStyle} from "./game-render";
import {PIXEL_HUNTER} from "./data/game";

export const getElementFromTemplate = (text) => {
  const element = document.createElement(`div`);
  element.innerHTML = text;
  return element;
};

export const selectScreen = (screen) => {
  main.innerHTML = ``;
  main.appendChild(screen);
};

// export const selectScreen = (state) => {
//   main.innerHTML = ``;
//   main.appendChild(setQuestionStyle(PIXEL_HUNTER[state.level]));
// };

export const checkQuestion = (question) => {
  let value = ``;
  return [...question].some((q)=> {
    value = q.value;
    return q.type === `radio` && q.checked;
  }) ? value : false;
};
