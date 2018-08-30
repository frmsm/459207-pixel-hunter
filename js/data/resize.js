export const resize = (frame, given) => {
  const k1 = (given.width - frame.width) / frame.width + 1;
  const k2 = (given.height - frame.height) / frame.height + 1;
  return k1 > k2
    ? {width: given.width / k1, height: given.height / k1}
    : {width: given.width / k2, height: given.height / k2};
};

