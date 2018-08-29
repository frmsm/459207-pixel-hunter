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
  let value = ``;
  return [...question].some((q)=> {
    value = q.value;
    return q.type === `radio` && q.checked;
  }) ? value : false;
};
