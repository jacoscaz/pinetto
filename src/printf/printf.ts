
/*
 * Initially vendored from the "fast-printf" package
 * by Gajus Kuizinas, released under the BSD-3-Clause license,
 * at commit 8372e5cbc7d4f16a655fd4c42077db0147c077af.
 * 
 * https://github.com/gajus/fast-printf/blob/8372e5cbc7d4f16a655fd4c42077db0147c077af 
 */

import { boolean } from './boolean';
import { tokenize } from './tokenize';
import type { Token, Flag } from './types';

const padValue = (value: string, width: number, flag: Flag | null): string => {
  if (flag === '-') {
    return value.padEnd(width, ' ');
  } else if (flag === '-+') {
    return ((Number(value) >= 0 ? '+' : '') + value).padEnd(width, ' ');
  } else if (flag === '+') {
    return ((Number(value) >= 0 ? '+' : '') + value).padStart(width, ' ');
  } else if (flag === '0') {
    return value.padStart(width, '0');
  } else {
    return value.padStart(width, ' ');
  }
};

const cache: Record<string, Token[]> = {};

export const printf = (subject: string, boundValues: any[]) => {
  let tokens = cache[subject];

  if (!tokens) {
    tokens = cache[subject] = tokenize(subject);
  }

  let result = '';

  for (const token of tokens) {
    if (token.type === 'literal') {
      result += token.literal;
    } else {
      let boundValue = boundValues[token.position];
      if (typeof boundValue === 'function'){
        boundValue = boundValue();
      }

      if (boundValue === undefined) {
        result += token.placeholder;
      } else if (token.conversion === 'b') {
        result += boolean(boundValue) ? 'true' : 'false';
      } else if (token.conversion === 'B') {
        result += boolean(boundValue) ? 'TRUE' : 'FALSE';
      } else if (token.conversion === 'c') {
        result += boundValue;
      } else if (token.conversion === 'C') {
        result += String(boundValue).toUpperCase();
      } else if (token.conversion === 'i' || token.conversion === 'd') {
        boundValue = String(Math.trunc(boundValue));

        if (token.width !== null) {
          boundValue = padValue(
            boundValue,
            token.width,
            token.flag,
          );
        }

        result += boundValue;
      } else if (token.conversion === 'e') {
        result += Number(
          boundValue,
        )
          .toExponential();
      } else if (token.conversion === 'E') {
        result += Number(
          boundValue,
        )
          .toExponential()
          .toUpperCase();
      } else if (token.conversion === 'f') {
        if (token.precision !== null) {
          boundValue = Number(boundValue).toFixed(token.precision);
        }

        if (token.width !== null) {
          boundValue = padValue(
            String(boundValue),
            token.width,
            token.flag,
          );
        }

        result += boundValue;
      } else if (token.conversion === 'o') {
        result += (Number.parseInt(String(boundValue), 10) >>> 0).toString(8);
      } else if (token.conversion === 's') {
        if (token.width !== null) {
          boundValue = padValue(
            String(boundValue),
            token.width,
            token.flag,
          );
        }

        result += boundValue;
      } else if (token.conversion === 'S') {
        if (token.width !== null) {
          boundValue = padValue(
            String(boundValue),
            token.width,
            token.flag,
          );
        }

        result += String(boundValue).toUpperCase();
      } else if (token.conversion === 'u') {
        result += Number.parseInt(String(boundValue), 10) >>> 0;
      } else if (token.conversion === 'x') {
        boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16);

        if (token.width !== null) {
          boundValue = padValue(
            String(boundValue),
            token.width,
            token.flag,
          );
        }

        result += boundValue;
      } else {
        throw new Error('Unknown format specifier.');
      }
    }
  }

  return result;
};
