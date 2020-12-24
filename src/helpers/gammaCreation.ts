/* eslint-disable no-plusplus */
const gammaCreators = {
  createGammaFirst: (key: string, textLength: number): string => {
    const gamma = key.repeat(Math.ceil(textLength / key.length));
    return gamma;
  },
  createGammaSecond: (key: string, textLength: number): string => {
    const newKey = key
      .split('')
      .map((el, idx) => el + idx)
      .join('');
    const gamma = newKey.repeat(Math.ceil(textLength / key.length));
    return gamma;
  },
  createGammaThird: (key: string, textLength: number): string => {
    const gamma = key.repeat(Math.ceil(textLength / key.length));
    return gamma
      .split('')
      .map((el, idx) => (idx % 2 ? el.toUpperCase() : el.toLowerCase()))
      .join('');
  },
};

export default gammaCreators;
