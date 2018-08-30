export const resize = (frame, given) => {
  const k1 = given.width / frame.width;
  const k2 = given.height / frame.height;
  const k = Math.max(k1, k2);
  return {width: given.width / k, height: given.height / k};
};

