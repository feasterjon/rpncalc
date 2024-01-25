/**
 * @jest-environment jsdom
 */

import { RPN } from '../../src/assets/js/modules/jrpncalc/rpn.js';

const main = new RPN();
const rpn = main.rpn;

test('It performs 1', () => {
  expect(rpn('1'))
  .toBe(1);
});

test('It performs 1 1 +', () => {
  expect(rpn('1 1 +'))
  .toBe(2);
});

test('It throws an error on a', () => {
  expect(rpn('a'))
  .toBe('error');
});

test('It throws an error on 1 a +', () => {
  expect(rpn('1 a +'))
  .toBe('error');
});

test('It throws an error on 1 + 1', () => {
  expect(rpn('1 + 1'))
  .toBe('error');
});

test('It throws an error on 1+1', () => {
  expect(rpn('1+1'))
  .toBe('error');
});

test('It performs 1 2 +', () => {
  expect(rpn('1 2 +'))
  .toBe(3);
});

test('It performs 1 2 + 3 +', () => {
  expect(rpn('1 2 + 3 +'))
  .toBe(6);
});

test('It throws an error on 1 2 3 +', () => {
  expect(rpn('1 2 3 +'))
  .toBe('error');
});

test('It performs 1 8 /', () => {
  expect(rpn('1 8 /'))
  .toBe(0.125);
});

test('It performs 1 2 + 3 - 5 * 8 /', () => {
  expect(rpn('1 2 + 3 - 5 * 8 /'))
  .toBe(0);
});

test('It performs 5 1 2 + 3 + *', () => {
  expect(rpn('5 1 2 + 3 + *'))
  .toBe(30);
});

test('It performs 5 1 2 + 3 + * 8 -', () => {
  expect(rpn('5 1 2 + 3 + * 8 -'))
  .toBe(22);
});

test('It performs 5 1 2 + 3 + * 8 - 13 /', () => {
  expect(rpn('5 1 2 + 3 + * 8 - 13 /'))
  .toBe(1.6923076923076923);
});

test('It performs 5493 107 239 + 33 + * 841 - 138 /', () => {
  expect(rpn('5493 107 239 + 33 + * 841 - 138 /'))
  .toBe(15079.753623188406);
});

test('It performs 5493 107 239 + 33 + * 841 - 138 /', () => {
  expect(rpn('5493 107 239 + 33 + * 841 - 138 /'))
  .toBe(15079.753623188406);
});