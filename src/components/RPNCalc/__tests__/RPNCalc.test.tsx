import { mockMatchMedia } from '../../../__mocks__/matchMedia';
import { render, screen, fireEvent } from '@testing-library/react';
import { RPNCalc } from '../RPNCalc';

beforeAll(() => {
  mockMatchMedia();
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

  test('It calculates the Expression 3 5 ^ 21 * s when key is pressed', () => {
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
    expect(expressionElement.textContent).toBe(' 3 5 ^ 21 \u00D7 \u221a|');
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    expect(expressionElement.textContent).toBe(' 71.4352853987 |');
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