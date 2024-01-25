/*
Title: RPN Calculator
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-10-12
*/

import { RPN } from './modules/jrpncalc/index.js'

export default {
    data() {
        return {
            buttons: [
                {
                "symbol": "C",
                "value": "C"
                },
                {
                "symbol": "\u232B",
                "value": "DEL"
                },
                {
                "symbol": "\u00F7",
                "value": "/"
                },
                {
                "symbol": "7",
                "value": 7
                },
                {
                "symbol": "8",
                "value": 8
                },
                {
                "symbol": "9",
                "value": 9
                },
                {
                "symbol": "\u00D7",
                "value": "*"
                },
                {
                "symbol": "4",
                "value": 4
                },
                {
                "symbol": "5",
                "value": 5
                },
                {
                "symbol": "6",
                "value": 6
                },
                {
                "symbol": "-",
                "value": "-"
                },
                {
                "symbol": "1",
                "value": 1
                },
                {
                "symbol": "2",
                "value": 2
                },
                {
                "symbol": "3",
                "value": 3
                },
                {
                "symbol": "+",
                "value": "+"
                },
                {
                "symbol": "0",
                "value": 0
                },
                {
                "symbol": ".",
                "value": "."
                },
                {
                "symbol": "\u005F\u005F",
                "value": " "
                },
                {
                "symbol": "=",
                "value": "="
                }
            ],
            currentNumber: "",
            lastNumber: "",
            maxDigits: 15,
            maxDigitsDecimal: 10,
            title: "RPN Calculator",
            vibrate: 1
        }
    },
    methods: {
        getButtonClasses(buttonValue) {
            return (buttonValue === ' ' || buttonValue === '-' || buttonValue === '+' || buttonValue === '/' || buttonValue === '*') ?
                'button-text-dark'
                : (buttonValue === '=') ? 'button-background-dark'
                : (buttonValue === 'DEL') ? 'button-text-delete'
                : (buttonValue === 'C') ? 'button-text-clear'
                : 'button-text';
        },
        calc() {
          let expression = this.currentNumber.toString();
          let result = RPN(this.formatExpression(expression)).toString();
          const resultTruncated = result.match(/^-?\d+(?:\.\d{0,10})?/); // truncate decimal to 10th digit
          if (resultTruncated) {
            result = resultTruncated.toString();
          }
          this.currentNumber = result;
          return
        },
        formatExpression(expression) {
          let output = expression.toString();
          output = output.replace(new RegExp(',', 'g'), '');
          output = output.replace(new RegExp('\u00D7', 'g'), '*');
          output = output.replace(new RegExp('\u00F7', 'g'), '/');
          return output;
        },
        formatNumbers(expression) {
          let output = '';
          expression = expression.toString();
          let numbers = expression.split(' ');
          numbers.forEach((number) => {
          let numFragments = number.split('.');
            numFragments[0] = numFragments[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            output += ' ' + numFragments.join('.');
          });
          return output;
        },
        processInput(buttonPressed) {
          if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '\u00D7' || buttonPressed === '\u00F7') {
            navigator.vibrate(this.vibrate);
            this.currentNumber = this.currentNumber + buttonPressed;
            console.log(this.currentNumber);
            return
          }
          else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
                  buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' || buttonPressed === ' ') {
            if (buttonPressed !== ' ' && this.validateNumbers(this.currentNumber + buttonPressed) === false) {
              return
            }
            navigator.vibrate(this.vibrate);
          }
          switch(buttonPressed) {
            case 'DEL':
              navigator.vibrate(this.vibrate);
              this.currentNumber = this.currentNumber.substring(0, (this.currentNumber.length - 1));
              return
            case 'C':
              navigator.vibrate(this.vibrate);
              this.lastNumber = "";
              this.currentNumber = "";
              return
            case '=':
              navigator.vibrate(this.vibrate);
              this.lastNumber = this.currentNumber;
              this.calc();
              return
          }
          this.currentNumber = this.currentNumber + buttonPressed;
        },
        validateNumbers(expression) {
          let output = true;
          expression = expression.toString();
          let numbers = expression.split(' ');
          numbers.forEach((number) => {
            let numFragments = number.split('.');
            if (numFragments[0]) {
              if (numFragments[0].length > this.maxDigits) {
                output = false;
                alert(`Maximum number of digits (${this.maxDigits}) exceeded.`);
                return output
              }
            }
            if (numFragments[1]) {
              if (numFragments[1].length > this.maxDigitsDecimal) {
                output = false;
                alert(`Maximum number of digits after decimal point (${this.maxDigitsDecimal}) exceeded.`);
                return output
              }
            }
          });
          return output;
        }
    },
    mounted() {
        console.log(`"${this.title}" loaded.`)
    },
    template: /*html*/`
    <div class="container">
        <div class="top">
            <div class="row">
                <div class="theme">
                    <p class="theme-button">T</p>
                </div>
                <div class="history">
                    <p class="history-text">{{formatNumbers(lastNumber)}}</p>
                    <div class="separator"></div>
                </div>
            </div>
            <div class="result">
                <p class="result-text">{{formatNumbers(currentNumber)}}</p>
                <div class="separator"></div>
            </div>
        </div>
        <div class="keypad">
            <div class="buttons">
                <button 
                    v-for="button in buttons"
                    @click="processInput(button.value)"
                    class="button"
                    :class="getButtonClasses(button.value)"
                >
                    {{button.symbol}}
                </button>
            </div>
        </div>
    </div>
    `
}