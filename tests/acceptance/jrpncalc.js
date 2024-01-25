/**
 * @jest-environment jest-environment-jsdom
 */

import { DATA, CONFIG, TEST_URL } from '../unit.js';
import { TEST_HTML } from '../acceptance.js';
import { Main } from '../../src/assets/js/main.js';

delete window.location;
window.location = new URL(TEST_URL);

const main = new Main(DATA);

document.body.innerHTML = TEST_HTML;

const expressionId = CONFIG.templateFields.expressionId;
const outputId = CONFIG.templateFields.outputId;

test('It performs 1', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '1';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 1
1
`);
});

test('It performs 1 1 +', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '1 1 +';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 2
1 1 +
`);
});

test('It performs (previous) 42 x +', () => {
  
  document.getElementById(expressionId).value =
  '42 x +';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 44
42 2 +
\xBB 2
1 1 +
`);
});

test('It performs blank space', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  ' ';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 
 
`);
});

test('It throws an error on 1 + 1', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '1 + 1';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB error
1 + 1
`);
});

test('It throws an error on 1 + 1', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '1 + 1';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB error
1 + 1
`);
});

test('It performs 1 8 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '1 8 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 0.125
1 8 /
`);
});

test('It performs 5493 107 239 + 33 + * 841 - 138 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '5493 107 239 + 33 + * 841 - 138 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 15079.753623188406
5493 107 239 + 33 + * 841 - 138 /
`);
});

test('It performs 5493 107 p + 33 + * 841 - 138 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '5493 107 p + 33 + * 841 - 138 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 5691.56353946499
5493 107 p + 33 + * 841 - 138 /
`);
});

test('It performs 5493 107 p + 33 + * s - 138 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '5493 107 p + 33 + * s - 138 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 5697.647494439176
5493 107 p + 33 + * s - 138 /
`);
});

test('It performs 5493 107 239 + 33 + * 841 - sqrt(4) /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  '5493 107 239 + 33 + * 841 - sqrt(4) /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 1040503
5493 107 239 + 33 + * 841 - sqrt(4) /
`);
});

test('It performs cos(3) 107 239 + 33 + * 841 - sqrt(4) /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  'cos(3) 107 239 + 33 + * 841 - sqrt(4) /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB -608.1035781057844
cos(3) 107 239 + 33 + * 841 - sqrt(4) /
`);
});

test('It performs cos(3) 107 239 + 33 + * pow(1,f) - 138 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  'cos(3) 107 239 + 33 + * pow(1,f) - 138 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB -2.72613881312731
cos(3) 107 239 + 33 + * pow(1,f) - 138 /
`);
});

test('It performs sin(3) 107 239 + 33 + * asin(1) - 138 /', () => {
  
  main.calcReset();
  document.getElementById(expressionId).value =
  'sin(3) 107 239 + 33 + * asin(1) - 138 /';
  main.calc();

  expect(document.getElementById(outputId).value)
  .toBe(`\xBB 0.3761861357093824
sin(3) 107 239 + 33 + * asin(1) - 138 /
`);
});

test('It builds the constants table', () => {
  
  let testHTMLResult = `<table class="table table-striped">
<tr><th>Symbol</th><th>Description</th>
</tr>
<tr><td>e</td><td>Euler's Number: <math><mi>e</mi></math></td></tr>
<tr><td>p</td><td>Archimedes' Constant: <math><mi>&#960;</mi></math></td></tr>
<tr><td>s</td><td>Pythagoras' Constant: <math><mi>&#8730;2</mi></math></td></tr>
<tr><td>f</td><td>The Golden Ratio: <math><mi>&#966;</mi></math></td></tr>
</table>`;

  expect(main.formatConstants())
  .toBe(testHTMLResult);
});