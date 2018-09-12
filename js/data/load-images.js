export const getImagesArray = (data, images) => {
  let imageData = new Set();
  for (let img of data) {
    for (let answer of img.answers) {
      const a = answer.image.url;
      imageData.add(a);
    }
  }
  let arr = [];
  for (let img of [...imageData]) {
    arr = [...arr, loadImage(img, images)];
  }
  return arr;
};

const loadImage = (url, images) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener(`load`, () => resolve(images[url] = img));
    img.addEventListener(`error`, () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });
};
