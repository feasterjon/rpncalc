/*
Title: (React) Reverse Polish Notation (RPN)
Author: Jonathan Feaster, JonFeaster.com
Date: 2024-02-29
*/

// Reverse Polish Notation (RPN)

export function JRPNCalc(expression, msgError = 'error') {
  if (!expression) return ''
  const operators = '+-*/^s', // Operators
    stack = [];
  expression = expression.replace(/^\s*|\s*$/g, ''); // remove leading and trailing whitespace
  if (!expression) return '' // nothing left after removing white space
  const tokens = expression.split(/\s+/); // split expression into tokens
  for (const token of tokens) {
    if (isNaN(token) && token.length > 1) return msgError // token is malformed (e.g. operator without a preceding space)
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
      continue;
    }
    if (operators.indexOf(token) === -1 || token.length > 1 || !stack.length) break; // token not valid operator or repeated, or no operands
    let operandB = stack.pop(),
      operandA = stack.pop(),
      result;
    if (token !== 's' && (isNaN(operandA) || isNaN(operandB))) break; // non-square root without valid operands
    if ((token === 's' && operandA) || (token === 's' && isNaN(operandB))) break; // square root without a single valid operand
    switch (token) {
      case '-':
        result = operandA - operandB;
        break;
      case '*':
        result = operandA * operandB;
        break;
      case '/':
        if (operandB === 0) { // prevent zero in the denominator
          result = msgError;
          break;
        }
        result = operandA / operandB;
        break;
      case '^':
        result = Math.pow(operandA, operandB);
        break;
      case 's':
        if (operandB < 0) { // prevent negative numbers
          result = msgError;
          break;
        }
        result = Math.sqrt(operandB);
        break;
      default:
        result = operandA + operandB;
    }
    stack.push(result);
  }
  if (!stack.length || stack.length > 1) return msgError
  return stack.pop()
}