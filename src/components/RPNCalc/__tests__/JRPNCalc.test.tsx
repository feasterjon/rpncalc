import { describe, expect, test } from 'vitest';
import { JRPNCalc } from '../JRPNCalc';

describe('JRPNCalc', () => {
  test('It performs 1', () => {
    expect(JRPNCalc('1'))
    .toBe('1');
  });

  test('It performs 1 1 +', () => {
    expect(JRPNCalc('1 1 +'))
    .toBe('2');
  });

  test('It throws an error on n', () => {
    expect(JRPNCalc('n'))
    .toBe('error');
  });

  test('It throws an error on 1 + 1', () => {
    expect(JRPNCalc('1 + 1'))
    .toBe('error');
  });

  test('It throws an error on 1+1', () => {
    expect(JRPNCalc('1+1'))
    .toBe('error');
  });

  test('It throws an error on 5 y +', () => {
    expect(JRPNCalc('5 y +'))
    .toBe('error');
  });

  test('It throws an error on y 8 +', () => {
    expect(JRPNCalc('y 8 +'))
    .toBe('error');
  });

  test('It throws an error on f b +', () => {
    expect(JRPNCalc('f b +'))
    .toBe('error');
  });

  test('It throws an error on f b', () => {
    expect(JRPNCalc('f b'))
    .toBe('error');
  });

  test('It throws an error on 5 8 s', () => {
    expect(JRPNCalc('5 8 s'))
    .toBe('error');
  });

  test('It throws an error on 21 0 /', () => {
    expect(JRPNCalc('21 0 /'))
    .toBe('error');
  });

  test('It throws an error on -13 s', () => {
    expect(JRPNCalc('-13 s'))
    .toBe('error');
  });

  test('It performs 1 2 +', () => {
    expect(JRPNCalc('1 2 +'))
    .toBe('3');
  });

  test('It performs 1 2 + 3 +', () => {
    expect(JRPNCalc('1 2 + 3 +'))
    .toBe('6');
  });

  test('It throws an error on 1 2 3 +', () => {
    expect(JRPNCalc('1 2 3 +'))
    .toBe('error');
  });

  test('It performs 1 8 /', () => {
    expect(JRPNCalc('1 8 /'))
    .toBe('0.125');
  });

  test('It performs 1 2 + 3 - 5 * 8 /', () => {
    expect(JRPNCalc('1 2 + 3 - 5 * 8 /'))
    .toBe('0');
  });

  test('It performs 5 1 2 + 3 + *', () => {
    expect(JRPNCalc('5 1 2 + 3 + *'))
    .toBe('30');
  });

  test('It performs 5 1 2 + 3 + * 8 -', () => {
    expect(JRPNCalc('5 1 2 + 3 + * 8 -'))
    .toBe('22');
  });

  test('It performs 5 1 2 + 3 + * 8 - 13 /', () => {
    expect(JRPNCalc('5 1 2 + 3 + * 8 - 13 /'))
    .toBe('1.6923076923076923');
  });

  test('It performs 5493 107 239 + 33 + * 841 - 138 /', () => {
    expect(JRPNCalc('5493 107 239 + 33 + * 841 - 138 /'))
    .toBe('15079.753623188406');
  });

  test('It performs 4 s', () => {
    expect(JRPNCalc('4 s'))
    .toBe('2');
  });

  test('It performs 49 s 3 *', () => {
    expect(JRPNCalc('49 s 3 *'))
    .toBe('21');
  });

  test('It performs 8 4 ^', () => {
    expect(JRPNCalc('8 4 ^'))
    .toBe('4096');
  });

  test('It performs 3 5 ^ 21 * s', () => {
    expect(JRPNCalc('3 5 ^ 21 * s'))
    .toBe('71.43528539874394');
  });

  test('It performs 200 10 ^', () => {
    expect(JRPNCalc('200 10 ^'))
    .toBe('1.024e+23');
  });

  test('It performs 1.1560205605056102e+40 2 *', () => {
    expect(JRPNCalc('1.1560205605056102e+40 2 *'))
    .toBe('2.3120411210112203e+40');
  });

  test('It performs 1.1560205605056102e+40 2.1490205605076102e+30 +', () => {
    expect(JRPNCalc('1.1560205605056102e+40 2.1490205605076102e+30 +'))
    .toBe('1.1560205607205122e+40');
  });
});