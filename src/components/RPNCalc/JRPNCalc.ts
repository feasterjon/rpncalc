/*
Title: JRPNCalc Reverse Polish Notation (RPN)
Author: Jonathan Feaster, JonFeaster.com
Date: 2024-05-17
*/

export function JRPNCalc(expression: string, msgError: string = 'error'): string {

  const hasOperator = (data: string | undefined): boolean => {
    if (!data) return false
    const operators: (string)[] = ['+', '-', '*', '/', '^', 's'];
    for (const operator of operators) {
      if (data.includes(operator) && !data.includes('e')) return true // allow for exponential notation
    }
    return false
  }

  if (!expression) return ''
  const stack: (number)[] = [];
  expression = expression.replace(/^\s*|\s*$/g, ''); // remove leading and trailing whitespace
  if (!expression) return '' // nothing left after removing white space
  const tokens: (string)[] = expression.split(/\s+/); // split expression into tokens
  let result: number;
  for (const token of tokens) {
    if (token.length > 1 && hasOperator(token)) return msgError // token is malformed (e.g. operator without a preceding space)
    if (!Number.isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
      continue;
    }
    if (!hasOperator(token) || token.length > 1 || !stack.length) return msgError // token not valid operator or repeated, or no operands
    const operandB: number | undefined = stack.pop(),
      operandA: number | undefined = stack.pop();
    if ((token === 's' && operandA) || (token === 's' && Number.isNaN(operandB))) return msgError // square root without a single valid operand
    switch (token) {
      case '+':
        if (typeof operandA !== 'number' || typeof operandB !== 'number') return msgError
        result = operandA + operandB;
        break;
      case '-':
        if (typeof operandA !== 'number' || typeof operandB !== 'number') return msgError
        result = operandA - operandB;
        break;
      case '*':
        if (typeof operandA !== 'number' || typeof operandB !== 'number') return msgError
        result = operandA * operandB;
        break;
      case '/':
        if (typeof operandA !== 'number' || typeof operandB !== 'number') return msgError
        if (operandB === 0) return msgError // prevent zero in the denominator
        result = operandA / operandB;
        break;
      case '^':
        if (typeof operandA !== 'number' || typeof operandB !== 'number') return msgError
        result = Math.pow(operandA, operandB);
        break;
      case 's':
        if (typeof operandB !== 'number') return msgError
        if (operandB < 0) return msgError // prevent negative numbers
        result = Math.sqrt(operandB);
        break;
      default:
        return msgError
    }
    stack.push(result);
  }
  if (!stack.length || stack.length > 1) return msgError
  return String(stack.pop())
}