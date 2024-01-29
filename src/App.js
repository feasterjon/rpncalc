import './App.css';

function App() {

  const buttons = [
    {
      value: 'C'
    },
    {
      label: '\u232B',
      value: 'DEL'
    },
    {
      label: '\u00F7',
      value: '/'
    },
    {
      label: '7',
      value: 7
    },
    {
      label: '8',
      value: 8
    },
    {
      label: '9',
      value: 9
    },
    {
      label: '\u00D7',
      value: '*'
    },
    {
      label: '4',
      value: 4
    },
    {
      label: '5',
      value: 5
    },
    {
      label: '6',
      value: 6
    },
    {
      value: '-'
    },
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      value: '+'
    },
    {
      label: '0',
      value: 0
    },
    {
      value: '.'
    },
    {
      label: '\u005F\u005F',
      value: ' '
    },
    {
      value: '='
    }
  ];

  const formatNumbers = (expression = '999') => {
    return expression
  };

  const handleInput = (input = 'Input handled') => {
    vibrateBasic();
    alert(input);
  };

  const vibrateBasic = (pattern = [50]) => {
    if (!pattern.length || !vibrateEnabled) return
    window.navigator.vibrate(pattern);
  };

  const vibrateEnabled = (typeof window.navigator.vibrate === 'function') ? true : false;

  return (
    <div className="container">
      <div className="top">
        <div className="row">
          <div className="theme">
          </div>
          <div className="history">
            <p className="text">{formatNumbers()}</p>
            <div className="separator"></div>
          </div>
        </div>
      </div>
      <p className="test">Tailwind test</p>
      {buttons.map((button) =>
        <div>
          <button onClick={() => handleInput(button.value)}>
            {button.label || button.value}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
