export const resize = (expected, natural) => {
  const k1 = (natural.width - expected.width) / expected.width + 1;
  const k2 = (natural.height - expected.height) / expected.height + 1;
  return k1 > k2
    ? {width: natural.width / k1, height: natural.height / k1}
    : {width: natural.width / k2, height: natural.height / k2};
};

