import logo from './logo.svg';
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

  const formatNumbers = (expression) => {
    return expression || `999`
  };

  const handleInput = (input) => {
    alert(input || `Input handled`);
  };

  return (
    <div className="container">
      <div class="top">
        <div class="row">
          <div class="theme">
          </div>
          <div class="history">
            <p class="text">{formatNumbers()}</p>
            <div class="separator"></div>
          </div>
        </div>
      </div>
      <p class="test">Tailwind test</p>
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
