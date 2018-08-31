import {main} from "./main";
import {PIXEL_HUNTER} from "./data/game";
import {resize} from "./data/resize";

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

export const addImages = (images, state, frame) => {
  [...images].forEach((it, i) => {
    const img = new Image();
    img.addEventListener(`load`, function () {
      const naturalSize = {width: img.width, height: img.height};
      const resolution = resize(frame, naturalSize);
      img.width = resolution.width;
      img.height = resolution.height;
      it.appendChild(img);
    });
    img.src = PIXEL_HUNTER[state.level].answers[i].img;
    img.alt = `Option ${i + 1}`;
  });
};
