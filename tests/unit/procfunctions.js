/**
 * @jest-environment jsdom
 */

import { CONFIG } from '../unit.js';
import { JRPNCalc } from '../../src/assets/js/modules/jrpncalc/index.js';

const jRPNCalc = new JRPNCalc(CONFIG.constants);

test('It performs pow(2,3)', () => {
  expect(jRPNCalc.procFunctions('pow(2,3)'))
  .toBe('8');
});

test('It performs sqrt(49)', () => {
  expect(jRPNCalc.procFunctions('sqrt(49)'))
  .toBe('7');
});

test('It performs nrt(5,8)', () => {
  expect(jRPNCalc.procFunctions('nrt(5,8)'))
  .toBe('1.2228445449938519');
});

test('It performs sin(13)', () => {
  expect(jRPNCalc.procFunctions('sin(13)'))
  .toBe('0.4201670368266409');
});

test('It performs cos(21)', () => {
  expect(jRPNCalc.procFunctions('cos(21)'))
  .toBe('-0.5477292602242684');
});

test('It performs tan(3)', () => {
  expect(jRPNCalc.procFunctions('tan(3)'))
  .toBe('-0.1425465430742778');
});

test('It performs asin(1)', () => {
  expect(jRPNCalc.procFunctions('asin(1)'))
  .toBe('1.5707963267948966');
});

test('It performs acos(0)', () => {
  expect(jRPNCalc.procFunctions('acos(0)'))
  .toBe('1.5707963267948966');
});

test('It performs atan(1)', () => {
  expect(jRPNCalc.procFunctions('atan(1)'))
  .toBe('0.7853981633974483');
});