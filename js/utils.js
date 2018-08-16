import {main} from "./main";

export const getElementFromTemplate = (text) => {
  const element = document.createElement(`template`);
  element.innerHTML = text;
  return element.content;
};

export const selectScreen = (screen) => {
  setTimeout(()=> {
    main.innerHTML = ``;
    main.appendChild(screen);
  }, 500);
};

export const checkQuestion = (question) => {
  for (let i = 0; i < question.length; i++) {
    if (question[i].type === `radio` && question[i].checked) {
      return true;
    }
  }
  return false;
};
