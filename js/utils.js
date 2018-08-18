import {main} from "./main";

export const getElementFromTemplate = (text) => {
  const element = document.createElement(`div`);
  element.innerHTML = text;
  return element;
};

export const selectScreen = (screen) => {
  main.innerHTML = ``;
  main.appendChild(screen);
};

export const checkQuestion = (question) => {
  return Array.from(question).some((q)=> {
    return q.type === `radio` && q.checked;
  });
};
