import gammaCreators from './gammaCreation';
import { ALPHABETS } from '../constants';

export const encrypt = (
  text: string,
  key: string,
  gammaMethod: string,
  alphabet: string
) => {
  const alpha = ALPHABETS[alphabet].split('');
  const gamma: any = gammaCreators[gammaMethod](key, text.length);
  const encryptedText = text
    .split('')
    .map(
      (el, idx) =>
        alpha[(alpha.indexOf(el) + alpha.indexOf(gamma[idx])) % alpha.length]
    )
    .join('');
  return encryptedText;
};

export const decrypt = (
  text: string,
  key: string,
  gammaMethod: string,
  alphabet: string
) => {
  const alpha = ALPHABETS[alphabet].split('');
  const gamma: any = gammaCreators[gammaMethod](key, text.length);
  const decryptedText = text
    .split('')
    .map(
      (el, idx) =>
        alpha[
          (alpha.indexOf(el) - alpha.indexOf(gamma[idx]) + alpha.length) %
            alpha.length
        ]
    )
    .join('');
  return decryptedText;
};
