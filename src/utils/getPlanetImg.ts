const getRandomNumber = () => {
  return Math.round(Math.random() * (8 - 1) + 1);
};

export const getPlanetImg = () => {
  return `/images/planet-${getRandomNumber()}.png`;
};
