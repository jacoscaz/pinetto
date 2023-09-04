
/*
 * Initially vendored from the "fast-printf" package
 * by Gajus Kuizinas, released under the BSD-3-Clause license,
 * at commit 8372e5cbc7d4f16a655fd4c42077db0147c077af.
 * 
 * https://github.com/gajus/fast-printf/blob/8372e5cbc7d4f16a655fd4c42077db0147c077af 
 */

export type Flag = '-' | '-+' | '+' | '0';

type LiteralToken = {
  type: 'literal',
  literal: string,
};

export type PlaceholderToken = {
  conversion: string,
  flag: Flag | null,
  placeholder: string,
  position: number,
  precision: number | null,
  type: 'placeholder',
  width: number | null,
};

export type Token = LiteralToken | PlaceholderToken;
