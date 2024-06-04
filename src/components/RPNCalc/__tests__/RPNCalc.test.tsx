import { CONFIG } from '../../../config';
import { mockLocalStorage } from '../../../__mocks__/localStorage';
import { mockMatchMedia } from '../../../__mocks__/matchMedia';
import { render, screen, fireEvent } from '@testing-library/react';
import { RPNCalc } from '../RPNCalc';

const mockStoragePrefix = CONFIG.storage.prefix;

const mockLocalStorageData = {
  history: `[
    {
      "answer": "8000",
      "date": 1708621952626,
      "expression": "2000 4 ×",
      "id": 9945929088
    },
    {
      "answer": "4",
      "date": 1708623099313,
      "expression": "2 2 +",
      "id": 4194468600
    },
    {
      "answer": "5",
      "date": 1708623230186,
      "expression": "2 3 +",
      "id": 4915432667
    },
    {
      "answer": "10",
      "date": 1708623247017,
      "expression": "5 5 +",
      "id": 7051625104
    },
    {
      "answer": "0.6666666666",
      "date": 1708623796924,
      "expression": "2 3 ÷",
      "id": 9374070239
    },
    {
      "answer": "4",
      "date": 1708627592972,
      "expression": "2 2 +",
      "id": 5924498838
    },
    {
      "answer": "4",
      "date": 1708627918436,
      "expression": "2 2 +",
      "id": 1007657472
    },
    {
      "answer": "7",
      "date": 1708627919987,
      "expression": "4 3 +",
      "id": 7041267205
    },
    {
      "answer": "15",
      "date": 1708627921524,
      "expression": "7 8 +",
      "id": 2845815373
    },
    {
      "answer": "22",
      "date": 1708627923651,
      "expression": "15 7 +",
      "id": 9999074507
    },
    {
      "answer": "0.625",
      "date": 1708627994019,
      "expression": "5 8 ÷",
      "id": 4258628170
    },
    {
      "answer": "7.1415926535",
      "date": 1708628140630,
      "expression": "4 π +",
      "id": 3004124692
    },
    {
      "answer": "9.1415926535",
      "date": 1708628148403,
      "expression": "7.1415926535 2 +",
      "id": 8557055987
    },
    {
      "answer": "15.1415926535",
      "date": 1708628156035,
      "expression": "9.1415926535 6 +",
      "id": 2703121049
    },
    {
      "answer": "17.1415926535",
      "date": 1708628159547,
      "expression": "15.1415926535 2 +",
      "id": 9490501620
    },
    {
      "answer": "4",
      "date": 1708636109164,
      "expression": "2 2 +",
      "id": 7298360498
    },
    {
      "answer": "1048576",
      "date": 1708641471520,
      "expression": "2 20 ^",
      "id": 4901314178
    },
    {
      "answer": "1048578",
      "date": 1708641504174,
      "expression": "1048576 2 +",
      "id": 6712396275
    },
    {
      "answer": "1099515822084",
      "date": 1708641509950,
      "expression": "1048578 1048578 ×",
      "id": 2859442440
    },
    {
      "answer": "1099515822084.5",
      "date": 1708641523693,
      "expression": "1099515822084 .5 +",
      "id": 5034155967
    },
    {
      "answer": "349986756184.99426",
      "date": 1708641529765,
      "expression": "1099515822084.5 π ÷",
      "id": 9226595409
    },
    {
      "answer": "145645645643.1416",
      "date": 1708642298524,
      "expression": "14564564564π",
      "id": 6076515480
    },
    {
      "answer": "4",
      "date": 1708643651411,
      "expression": "2 2 +",
      "id": 8055393389
    },
    {
      "answer": "4",
      "date": 1708646925697,
      "expression": "4 ",
      "id": 3792131206
    },
    {
      "answer": "5",
      "date": 1708647312536,
      "expression": "2 3 +",
      "id": 7641771872
    },
    {
      "answer": "7",
      "date": 1708648210356,
      "expression": "2 5 +",
      "id": 4627792788
    },
    {
      "answer": "12",
      "date": 1708648241532,
      "expression": "7 5 +",
      "id": 8055691443
    },
    {
      "answer": "16",
      "date": 1708648243227,
      "expression": "12 4 +",
      "id": 8359149511
    },
    {
      "answer": "5",
      "date": 1708648718170,
      "expression": "2 3 +",
      "id": 7427116413
    },
    {
      "answer": "45",
      "date": 1708648720417,
      "expression": "5 40 +",
      "id": 2633095455
    },
    {
      "answer": "5",
      "date": 1708698983678,
      "expression": "2 3 +",
      "id": 8779752440
    },
    {
      "answer": "5",
      "date": 1708699235149,
      "expression": "2 3 +",
      "id": 6926269919
    },
    {
      "answer": "5",
      "date": 1708700797737,
      "expression": "2 3 +",
      "id": 8799316459
    },
    {
      "answer": "4",
      "date": 1708801741378,
      "expression": "2 2 +",
      "id": 1464738107
    },
    {
      "answer": "4",
      "date": 1708960318076,
      "expression": "2 2 +",
      "id": 8392217095
    },
    {
      "answer": "7",
      "date": 1708960319667,
      "expression": "4 3 +",
      "id": 9194717599
    },
    {
      "answer": "4",
      "date": 1709243303475,
      "expression": "2 2 +",
      "id": 5382392806
    },
    {
      "answer": "7",
      "date": 1709243337331,
      "expression": "4 3 +",
      "id": 8689926581
    },
    {
      "answer": "0.6666666666",
      "date": 1709244134536,
      "expression": "2 3 ÷",
      "id": 9264696124
    },
    {
      "answer": "4",
      "date": 1709249818005,
      "expression": "2 2 +",
      "id": 3594997254
    },
    {
      "answer": "13",
      "date": 1709249828325,
      "expression": "4 9 +",
      "id": 2217923466
    },
    {
      "answer": "4",
      "date": 1709249886453,
      "expression": "2 2 +",
      "id": 4537270337
    },
    {
      "answer": "4",
      "date": 1709249969224,
      "expression": "2 2 +",
      "id": 4413204413
    },
    {
      "answer": "9",
      "date": 1709249971223,
      "expression": "4 5 +",
      "id": 3368010641
    },
    {
      "answer": "1.6180339887",
      "date": 1709249986763,
      "expression": "φ",
      "id": 6891531671
    },
    {
      "answer": "0.6666666666",
      "date": 1709301880934,
      "expression": "2 3 ÷",
      "id": 1173442848
    },
    {
      "answer": "15.7079632679",
      "date": 1709301919237,
      "expression": " 5 π ×",
      "id": 8256387297
    },
    {
      "answer": "8.0901699437",
      "date": 1709301923390,
      "expression": "5 φ ×",
      "id": 9364764022
    },
    {
      "answer": "13.0901699436",
      "date": 1709301927390,
      "expression": "8.0901699437 φ ×",
      "id": 7890277254
    },
    {
      "answer": "21.1803398872",
      "date": 1709301929702,
      "expression": "13.0901699436 φ ×",
      "id": 2920685991
    },
    {
      "answer": "34.2705098307",
      "date": 1709301932077,
      "expression": "21.1803398872 φ ×",
      "id": 4218132275
    },
    {
      "answer": "55.4508497178",
      "date": 1709301934214,
      "expression": "34.2705098307 φ ×",
      "id": 7412110175
    },
    {
      "answer": "89.7213595484",
      "date": 1709301936390,
      "expression": "55.4508497178 φ ×",
      "id": 3963326755
    },
    {
      "answer": "145.1722092661",
      "date": 1709301938870,
      "expression": "89.7213595484 φ ×",
      "id": 6374892034
    },
    {
      "answer": "4",
      "date": 1709313211363,
      "expression": "2 2 +",
      "id": 4936943311
    },
    {
      "answer": "7",
      "date": 1709313212668,
      "expression": "4 3 +",
      "id": 1959424665
    },
    {
      "answer": "40",
      "date": 1709314147574,
      "expression": "5 8 ×",
      "id": 3319381460
    },
    {
      "answer": "160",
      "date": 1709314150046,
      "expression": "40 4 ×",
      "id": 7592459788
    },
    {
      "answer": "163",
      "date": 1709314151790,
      "expression": "160 3 +",
      "id": 8125606027
    },
    {
      "answer": "172",
      "date": 1709314154142,
      "expression": "163 9 +",
      "id": 6652127669
    },
    {
      "answer": "8.6",
      "date": 1709314159094,
      "expression": "172 20 ÷",
      "id": 3368151480
    },
    {
      "answer": "27.0176968208",
      "date": 1709320969564,
      "expression": "8.6 π ×",
      "id": 9564412542
    },
    {
      "answer": "54.0353936416",
      "date": 1709320988537,
      "expression": "27.0176968208 2 ×",
      "id": 4078591124
    },
    {
      "answer": "1.1560205605",
      "date": 1709326292270,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 1989239886
    },
    {
      "answer": "1.1560205605056102",
      "date": 1709326310536,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 2799866042
    },
    {
      "answer": "1.1560205605056102",
      "date": 1709326460070,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 5465564781
    },
    {
      "answer": "1.1560205605056102",
      "date": 1709326889384,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 3102825160
    },
    {
      "answer": "1.1560205605056102",
      "date": 1709326981932,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 8208070872
    },
    {
      "answer": "1.1560205605056102",
      "date": 1709328826010,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 1755561432
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328869051,
      "expression": "115602056050561 100000000000000000000000000 * ",
      "id": 6928823944
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328874131,
      "expression": "1.1560205605056102e+40 1 +",
      "id": 9356364588
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328925165,
      "expression": "1.1560205605056102e+40 ",
      "id": 9438046857
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328926386,
      "expression": "1.1560205605056102e+40 ",
      "id": 1482730098
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328926778,
      "expression": "1.1560205605056102e+40 ",
      "id": 9993343841
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328927082,
      "expression": "1.1560205605056102e+40 ",
      "id": 5544753677
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328927354,
      "expression": "1.1560205605056102e+40 ",
      "id": 3481171247
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328927826,
      "expression": "1.1560205605056102e+40 ",
      "id": 6523181581
    },
    {
      "answer": "1.1560205605056102e+40",
      "date": 1709328927962,
      "expression": "1.1560205605056102e+40 ",
      "id": 8447934424
    },
    {
      "answer": "Infinity",
      "date": 1709328943578,
      "expression": "200 200 ^",
      "id": 7243893978
    },
    {
      "answer": "64000000000000",
      "date": 1709328949531,
      "expression": "200 6 ^",
      "id": 6233537992
    },
    {
      "answer": "1.024e+23",
      "date": 1709328954330,
      "expression": "200 10 ^",
      "id": 1917357590
    },
    {
      "answer": "1.024",
      "date": 1709329022179,
      "expression": "1.024e+23 2 +",
      "id": 9310834703
    },
    {
      "answer": "64000000000000",
      "date": 1709329049762,
      "expression": "200 6 ^",
      "id": 1824034561
    },
    {
      "answer": "1.024e+23",
      "date": 1709329056802,
      "expression": "200 10 ^",
      "id": 4935816197
    },
    {
      "answer": "1.024e+23",
      "date": 1709329071298,
      "expression": "1.024e+23 1 ×",
      "id": 2394225519
    },
    {
      "answer": "2.048e+23",
      "date": 1709329076210,
      "expression": "1.024e+23 2 ×",
      "id": 3171325938
    },
    {
      "answer": "0.5",
      "date": 1709329181235,
      "expression": "1 2 ÷",
      "id": 6403859130
    },
    {
      "answer": "1.024e+23",
      "date": 1709330089132,
      "expression": "200 10 ^",
      "id": 4204542727
    },
    {
      "answer": "1.024e+23",
      "date": 1709330093003,
      "expression": "1.024e+23 1 +",
      "id": 6495593715
    },
    {
      "answer": "3202.089263736042",
      "date": 1709333766121,
      "expression": "φ 1979 ×",
      "id": 8450724271
    },
    {
      "answer": "3202.089263736042",
      "date": 1709333847000,
      "expression": "3202.089263736042",
      "id": 1311591544
    },
    {
      "answer": "3204.089263736",
      "date": 1709333886776,
      "expression": "3202.0892637360 2 +",
      "id": 7548737100
    },
    {
      "answer": "3206.089263736",
      "date": 1709334005608,
      "expression": "3204.089263736 2 +",
      "id": 7571585984
    },
    {
      "answer": "5",
      "date": 1709334124576,
      "expression": "5",
      "id": 2312542265
    },
    {
      "answer": "5",
      "date": 1709334127935,
      "expression": "5",
      "id": 1684868329
    },
    {
      "answer": "5",
      "date": 1709334133839,
      "expression": "5",
      "id": 6857942949
    },
    {
      "answer": "5",
      "date": 1709334134879,
      "expression": "5 ",
      "id": 4906694137
    },
    {
      "answer": "5",
      "date": 1709334135535,
      "expression": "5 ",
      "id": 1602032377
    },
    {
      "answer": "7",
      "date": 1709334140375,
      "expression": "7",
      "id": 4516667952
    },
    {
      "answer": "28.1780056072",
      "date": 1717512748412,
      "expression": "794 √",
      "id": 9487980791
    }
  ]`,
  theme: 'dark'
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage()
});

const setMockLocalStorageData = () => {
  localStorage.setItem(`${mockStoragePrefix}history`, mockLocalStorageData.history);
  localStorage.setItem(`${mockStoragePrefix}theme`, mockLocalStorageData.theme);
};

const getMockDate = () => {
  return new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

beforeAll(() => {
  mockMatchMedia();
});

afterEach(() => {
  localStorage.clear();
});

describe('RPNCalc Component', () => {
  test('It renders the Expression', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('expression')).toBeInTheDocument();
  });

  test('It calculates the Expression 3 5 ^ 21 * s when button is clicked', () => {
    render(<RPNCalc />);
    const expressionElement = screen.getByTestId('expression');

    fireEvent.click(screen.getByLabelText('3'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('5'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('^'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('2'));
    fireEvent.click(screen.getByLabelText('1'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('\u00D7'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('\u221a'));
    expect(expressionElement.textContent).toBe(' 3 5 ^ 21 \u00D7 \u221a|');
    fireEvent.click(screen.getByLabelText('Enter'));
    expect(expressionElement.textContent).toBe(' 71.4352853987 |');
  });

  test('It calculates the Expression 3 5 ^ 21 * s 100000000 * when key is pressed formats the numbers', () => {
    render(<RPNCalc />);
    const expressionElement = screen.getByTestId('expression');
    fireEvent.keyDown(window, { key: '3', code: 'Digit3' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '5', code: 'Digit5' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '^', code: 'Digit6' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '2', code: 'Digit2' });
    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '*', code: 'Digit8' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: 's', code: 'KeyS' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: '0', code: 'Digit0' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: '*', code: 'Digit8' });
    expect(expressionElement.textContent).toBe(' 3 5 ^ 21 \u00D7 \u221a 100,000,000 \u00D7|');
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    expect(expressionElement.textContent).toBe(' 7,143,528,539.874394 |');
  });

  test('It stores the last calculation', () => {
    render(<RPNCalc />);
    fireEvent.click(screen.getByLabelText('5'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('8'));
    fireEvent.click(screen.getByLabelText('Space'));
    fireEvent.click(screen.getByLabelText('+'));
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    expect(screen.getByTestId('history-extended-last').textContent).toBe(`${getMockDate()} 5 8 + 13`);
  });

  test('It applies the correct stored last answer when button is clicked', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    const expressionElement = screen.getByTestId('expression');
    fireEvent.click(screen.getByLabelText('Last Answer'));
    expect(expressionElement.textContent).toBe(' 28.1780056072 |');
  });

  test('It applies the correct stored last answer when key is pressed', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    const expressionElement = screen.getByTestId('expression');
    fireEvent.keyDown(window, { key: 'a', code: 'KeyA' });
    expect(expressionElement.textContent).toBe(' 28.1780056072 |');
  });

  test('It cycles themes when clicking Theme dropdown item', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('dark');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
  });

  test('It applies the correct stored theme os-default and cycles themes when clicking Theme dropdown item', () => {
    localStorage.setItem(`${mockStoragePrefix}theme`, 'os-default');
    render(<RPNCalc />);
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('dark');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
  });

  test('It applies the correct stored theme and cycles themes when clicking Theme dropdown item', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('dark');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('light');
    fireEvent.click(screen.getByRole('option', { name: /Theme/i }));
    expect(screen.getByTestId('main').getAttribute('data-mode')).toBe('dark');
  });

  test('It applies the correct stored history items', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    expect(screen.getByTestId('history-extended-last').textContent).toBe('June 4, 2024 794 √ 28.1780056072');
    expect(screen.getByTestId('history-extended-3').textContent).toBe('February 26, 2024 2 2 + 4 4 3 + 7');
  });

  test('It toggles History visibility when clicking History dropdown item', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('history').firstChild).toHaveClass('fadeHidden');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /History/i }));
    expect(screen.getByTestId('history').firstChild).toHaveClass('fadeVisible');
    fireEvent.click(screen.getAllByLabelText('Toggle History')[0]);
    expect(screen.getByTestId('history').firstChild).toHaveClass('fadeHidden');
  });

  test('It toggles Extended History visibility when clicking Toggle Extended History button is clicked', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    expect(screen.getByTestId('history-extended-last').parentElement).toHaveClass('fadeVisible');
    expect(screen.getByTestId('history-extended-0').parentElement).toHaveClass('fadeHidden');
    fireEvent.click(screen.getAllByLabelText('Toggle Extended History')[0]);
    expect(screen.getByTestId('history-extended-0').parentElement).toHaveClass('fadeVisible');
  });

  test('It clears stored history items when button is clicked', () => {
    setMockLocalStorageData();
    render(<RPNCalc />);
    expect(screen.getByTestId('history-extended-last').textContent).toBe('June 4, 2024 794 √ 28.1780056072');
    expect(screen.getByTestId('history-extended-3').textContent).toBe('February 26, 2024 2 2 + 4 4 3 + 7');
    fireEvent.click(screen.getByLabelText('Clear History'));
    expect(screen.queryByTestId('history-extended-last')).toBeNull();
    expect(screen.queryByTestId('history-extended-3')).toBeNull();
  });

  test('It toggles Keypad visibility when clicking Keypad dropdown item', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('interface')).not.toHaveClass('hidden');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /Keypad/i }));
    expect(screen.getByTestId('interface')).toHaveClass('hidden');
    fireEvent.click(screen.getByRole('option', { name: /Keypad/i }));
    expect(screen.getByTestId('interface')).not.toHaveClass('hidden');
  });

  test('It toggles Help visibility when clicking Help dropdown item', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeHidden');
    fireEvent.click(screen.getByLabelText('Settings'));
    fireEvent.click(screen.getByRole('option', { name: /Help/i }));
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeVisible');
  });

  test('It toggles Help visibility when ? key is pressed', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeHidden');
    fireEvent.keyDown(window, { key: '?', code: 'Slash' });
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeVisible');
    fireEvent.keyDown(window, { key: '?', code: 'Slash' });
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeHidden');
  });

  test('It toggles Help visibility when Ctrl + / key is pressed', () => {
    render(<RPNCalc />);
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeHidden');
    fireEvent.keyDown(window, { key: '/', ctrlKey: true });
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeVisible');
    fireEvent.keyDown(window, { key: '/', ctrlKey: true });
    expect(screen.getByTestId('dialog-mask').parentElement).toHaveClass('fadeHidden');
  });
});