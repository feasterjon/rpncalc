import { render, screen, fireEvent } from '@testing-library/react';
import { Keyboard } from '../Keyboard';

const mockConfig = {
  buttons: {
    data: [
      { id: 1,
        value: '1'
      },
      {
        id: 2,
        value: '2'
      },
      { 
        id: 3,
        value: '3'
      },
      {
        id: 4,
        label:
        'Clear',
        value:
        'Delete',
        type: 'del'
      },
      {
        id: 5,
        label: 'Enter',
        value: 'Enter',
        type: 'enter'
      },
      {
        aria: 'Phi',
        icon: { 
          id: 'phi'
        },
        id: 6,
        label: '\u03C6',
        value: 'f',
        type: 'fn'
      },
      {
        id: 7,
        value: '+',
        type: 'operator'
      },
      {
        id: 8,
        value: '-',
        type: 'operator'
      }
    ],
    styles: {
      del: {
        active: 'del-active',
        etc: 'del-etc',
        main: 'del-main'
      },
      enter: {
        active: 'enter-active',
        etc: 'enter-etc',
        main: 'enter-main'
      },
      fn: {
        active: 'fn-active',
        etc: 'fn-etc'
      },
      main: {
        active: 'main-active',
        etc: 'main-etc',
        main: 'main-main'
      },
      operator: {
        active: 'operator-active',
        etc: 'operator-etc'
      }
    }
  },
  setCurrentInput: jest.fn(),
  vibrateEnabled: false
};

const buttonsFormatted = [
  {
    aria: '1',
    icon: {},
    id: 1,
    label: '1',
    order: '',
    stylesType: {
      active: 'main-active',
      etc: 'main-etc',
      main: 'main-main'
    },
    type: '',
    value: '1'
  },
  {
    aria: 'Clear',
    icon: {},
    id: 4,
    label: 'Clear',
    order: '',
    stylesType: {
      active: 'del-active',
      etc: 'del-etc',
      main: 'del-main'
    },
    type: 'del',
    value: 'Delete'
  },
  {
    aria: 'Enter',
    icon: {},
    id: 5,
    label: 'Enter',
    order: '',
    stylesType: {
      active: 'enter-active',
      etc: 'enter-etc',
      main: 'enter-main'
    },
    type: 'enter',
    value: 'Enter'
  },
  {
    aria: 'Phi',
    icon: {
      id: 'phi'  
    },
    id: 6,
    label: '\u03C6',
    order: '',
    stylesType: {
      active: 'fn-active',
      etc: 'fn-etc'
    },
    type: 'fn',
    value: 'f'
  },
  {
    aria: '+',
    icon: {},
    id: 7,
    label: '+',
    order: '',
    stylesType: {
      active: 'operator-active',
      etc: 'operator-etc'
    },
    type: 'operator',
    value: '+'
  }
];

describe('Keyboard Component', () => {
  test('It renders keyboard with correct buttons with correct classes', () => {
    render(<Keyboard config={mockConfig} />);

    // Assert that the keyboard renders with correct buttons
    const button1 = screen.getByText('1');
    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');
    const button4 = screen.getByText('Clear');
    const button5 = screen.getByText('Enter');
    const button6 = screen.getByLabelText('Phi');
    const button7 = screen.getByText('+');
    const button8 = screen.getByText('-');
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();
    expect(button6).toBeInTheDocument();
    expect(button7).toBeInTheDocument();
    expect(button8).toBeInTheDocument();
    expect(button1).toHaveClass('main-main');
    expect(button1).toHaveClass('main-etc');
    expect(button2).toHaveClass('main-main');
    expect(button2).toHaveClass('main-etc');
    expect(button3).toHaveClass('main-main');
    expect(button3).toHaveClass('main-etc');
    expect(button4).toHaveClass('del-main');
    expect(button4).toHaveClass('del-etc');
    expect(button5).toHaveClass('enter-main');
    expect(button5).toHaveClass('enter-etc');
    expect(button6).toHaveClass('fn-etc');
    expect(button7).toHaveClass('operator-etc');
    expect(button8).toHaveClass('operator-etc');
  });

  test('It calls setCurrentInput with correct data when button is clicked', () => {
    render(<Keyboard config={mockConfig} />);

    fireEvent.click(screen.getByText('1'));
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[0]);

    fireEvent.click(screen.getByText('Clear'));
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[1]);

    fireEvent.click(screen.getByText('Enter'));
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[2]);

    fireEvent.click(screen.getByLabelText('Phi'));
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[3]);

    fireEvent.click(screen.getByText('+'));
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[4]);
  });

  test('It calls setCurrentInput with correct data when key is pressed', () => {
    render(<Keyboard config={mockConfig} />);

    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[0]);

    fireEvent.keyDown(window, { key: 'Delete', code: 'Delete' });
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[1]);

    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[2]);

    fireEvent.keyDown(window, { key: 'f', code: 'KeyF' });
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[3]);

    fireEvent.keyDown(window, { key: '+', code: 'Equal' });
    // Assert that setCurrentInput is called with the correct formatted button data
    expect(mockConfig.setCurrentInput).toHaveBeenCalledWith(buttonsFormatted[4]);
  });

  test('It applies active styles when key is pressed', () => {
    render(<Keyboard config={mockConfig} />);

    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    expect(screen.getByText('1')).toHaveClass('main-active');

    fireEvent.keyDown(window, { key: '2', code: 'Digit2' });
    expect(screen.getByText('2')).toHaveClass('main-active');

    fireEvent.keyDown(window, { key: '3', code: 'Digit3' });
    expect(screen.getByText('3')).toHaveClass('main-active');

    fireEvent.keyDown(window, { key: 'Delete', code: 'Delete' });
    expect(screen.getByText('Clear')).toHaveClass('del-active');

    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Enter')).toHaveClass('enter-active');

    fireEvent.keyDown(window, { key: 'f', code: 'KeyF' });
    expect(screen.getByLabelText('Phi')).toHaveClass('fn-active');

    fireEvent.keyDown(window, { key: '+', code: 'Equal' });
    expect(screen.getByText('+')).toHaveClass('operator-active');

    fireEvent.keyDown(window, { key: '-', code: 'Minus' });
    expect(screen.getByText('-')).toHaveClass('operator-active');
  });
});
