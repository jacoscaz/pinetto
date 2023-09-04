
/*
 * Initially vendored from the "boolean" package
 * by https://www.thenativeweb.io, released under the MIT license,
 * at commit 6af03e40f55ed848eb2d2f84c9d11cd629a94b6d.
 * 
 * https://github.com/thenativeweb/boolean/tree/6af03e40f55ed848eb2d2f84c9d11cd629a94b6d
 */

const TRUE: Record<string, 1> = Object.create(null);

TRUE['true'] = 1;
TRUE['TRUE'] = 1;
TRUE['t'] = 1;
TRUE['T'] = 1;
TRUE['yes'] = 1;
TRUE['YES'] = 1;
TRUE['y'] = 1;
TRUE['Y'] = 1;
TRUE['1'] = 1;

export const boolean = function (value: any): boolean {
  switch (Object.prototype.toString.call(value)) {
    case '[object String]':
      return value in TRUE;

    case '[object Number]':
      return value.valueOf() === 1;

    case '[object Boolean]':
      return value.valueOf();

    default:
      return false;
  }
};
