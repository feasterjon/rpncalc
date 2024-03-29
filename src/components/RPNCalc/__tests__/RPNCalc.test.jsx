import { mockMatchMedia } from '../../../__mocks__/matchMedia';
import { render, screen } from '@testing-library/react';
import { RPNCalc } from '../RPNCalc';

beforeAll(() => {
  mockMatchMedia();
});

test('It renders the Expression', () => {
  render(<RPNCalc />);
  const expressionElement = screen.getByRole('textbox', {name: /Expression/i});
  expect(expressionElement).toBeInTheDocument();
});