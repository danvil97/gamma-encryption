/* eslint-disable no-bitwise */
import gammaCreators from './gammaCreation';
import { ALPHABETS } from '../constants';

export const xorEncrypt = (
  text: string,
  key: string,
  gammaMethod: string,
  alphabet: string
) => {
  const gamma: any = gammaCreators[gammaMethod](key, text.length);
  const encryptedText = Array.prototype.slice
    .call(text)
    .map((c, index) => {
      return String.fromCharCode(
        c.charCodeAt(0) ^ gamma[index % text.length].charCodeAt(0)
      );
    })
    .join('');
  return encryptedText;
};

export const xorDecrypt = (
  text: string,
  key: string,
  gammaMethod: string,
  alphabet: string
) => {
  const gamma: any = gammaCreators[gammaMethod](key, text.length);
  const decryptedText = Array.prototype.slice
    .call(text)
    .map((c, index) => {
      return String.fromCharCode(
        c.charCodeAt(0) ^ gamma[index % text.length].charCodeAt(0)
      );
    })
    .join('');
  return decryptedText;
};
