import { mockMatchMedia } from '../../../__mocks__/matchMedia';
import { render, screen } from '@testing-library/react';
import { RPNCalc } from '../RPNCalc';

beforeAll(() => {
  mockMatchMedia();
});

test('It renders the Expression', () => {
  render(<RPNCalc />);
  const linkElement = screen.getByRole('textbox', {name: /Expression/i});
  expect(linkElement).toBeInTheDocument();
});