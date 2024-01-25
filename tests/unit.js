export const DATA = {
  "data": [
    {
      "type": "config",
      "id": "1",
      "attributes": {
        "enableCreds": true,
        "enableHelp": true,
        "templateId": "template",
        "helpContentId": "help",
        "localData": {
          "name": "JRPNCalc",
          "persistence": true,
          "cookieStorage": false,
          "reset": false
        },
        "templateFields": {
          "outputId": "output",
          "expressionId": "expression"
        },
        "templateButtons": {
          "submitId": "button-calculate",
          "resetId": "button-reset",
          "helpId": "button-help"
        },
        "constants": [
          {
            "name": "Euler's Number",
            "symbol": "e",
            "value": "Math.E",
            "properSymbol": "e",
            "description": "Euler's Number e"
          },
          {
            "name": "Archimedes' Constant",
            "symbol": "p",
            "value": "Math.PI",
            "properSymbol": "&#960;",
            "description": "Archimedes' Constant Pi"
          },
          {
            "name": "Pythagoras' Constant",
            "symbol": "s",
            "value": "Math.SQRT2",
            "properSymbol": "&#8730;2",
            "description": "Pythagoras' Constant"
          },
          {
            "name": "The Golden Ratio",
            "symbol": "f",
            "value": "(1 + Math.sqrt(5)) / 2",
            "properSymbol": "&#966;",
            "description": "The Golden Ratio Phi"
          }
        ]
      }
    }
  ]
};

export const CONFIG = DATA.data[0].attributes;

export const TEST_URL = 'https://www.example.com/';