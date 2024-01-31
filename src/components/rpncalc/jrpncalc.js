/*
Title: (React) Reverse Polish Notation (RPN)
Author: Jonathan Feaster, JonFeaster.com (Based on: RPN Calculator, boykobbatgmaildotcom)
Date: 2021-12-09
*/

// Reverse Polish Notation (RPN)

export function RPN(expression) {

  let i, tokens, x, y, z;
  let stack = [];
  const numberPatt = /^[+-]?(\.\d+|\d+(\.\d*)?)$/; // Number Pattern
  const operatorPatt = '+-*/'; // Operator Pattern
  expression = expression.replace(/^\s*|\s*$/g, '');

  if (expression.length > 0) {
    expression = expression.split(/\s+/);
  }
  else {
    expression = [];
  }
  let expressionLength = expression.length;
  for (i = 0; i < expressionLength; ++i) {
    tokens = expression[i];
    if (numberPatt.test(tokens)) {
      z = parseFloat(tokens);
    }
    else {
      if (tokens.length > 1 || operatorPatt.indexOf(tokens) === -1 || stack.length < 2) { // token not number nor operator or no arguments in stack
        break;
      }
      y = stack.pop();
      x = stack.pop();
      z = eval(x + tokens + ' ' + y);
    }
    stack.push(z);
  }
  if (i < expression.length || stack.length > 1) {
    return 'error';
  }
  else {
    if (stack.length === 1) {
      return stack.pop();
    }
    else {
      return '';
    }
  }
}