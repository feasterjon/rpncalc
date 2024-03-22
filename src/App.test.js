import { mockMatchMedia } from './__mocks__/matchMedia';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  mockMatchMedia();
});

test('renders the RPNCalc Expression', () => {
  render(<App />);
  const linkElement = screen.getByRole('textbox', {name: /Expression/i});
  expect(linkElement).toBeInTheDocument();
});
