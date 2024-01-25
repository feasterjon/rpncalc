/**
 * @jest-environment jsdom
 */

import { CONFIG } from '../unit.js';
import { JRPNCalc } from '../../src/assets/js/modules/jrpncalc/index.js';

const jRPNCalc = new JRPNCalc(CONFIG.constants);

test('It performs e', () => {
  expect(jRPNCalc.procConstants('e'))
  .toBe('2.718281828459045');
});

test('It performs p', () => {
  expect(jRPNCalc.procConstants('p'))
  .toBe('3.141592653589793');
});

test('It performs s', () => {
  expect(jRPNCalc.procConstants('s'))
  .toBe('1.4142135623730951');
});

test('It performs f', () => {
  expect(jRPNCalc.procConstants('f'))
  .toBe('1.618033988749895');
});