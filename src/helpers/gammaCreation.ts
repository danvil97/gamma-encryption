// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Srand from 'seeded-rand';

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
  createGammaWithPseudoRandom: (key: string, textLength: number): string => {
    const pseudoRandomSeed = +key
      .split('')
      .map((el) => el.charCodeAt(0))
      .join('');
    const rnd = new Srand(pseudoRandomSeed);
    let gamma = '';
    for (let i = 0; i <= textLength; i += 1) {
      gamma += rnd.random();
    }
    return gamma;
  },
};

export default gammaCreators;
