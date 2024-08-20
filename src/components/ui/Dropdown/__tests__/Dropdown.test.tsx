import { vi, describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

const mockConfig = {
  data: [
    { icon: 'eye', id: 1, label: 'Option 1', onClick: vi.fn() },
    { icon: 'clock', id: 2, label: 'Option 2', onClick: vi.fn(), persist: true },
    { icon: 'question-mark-circle', id: 3, label: 'Option 3', onClick: vi.fn() }
  ],
  icon: 'info',
  label: 'Dropdown',
  styles: {},
  vibrateEnabled: false,
};

describe('Dropdown Component', () => {
  test('It renders the dropdown button with closed dropdown', () => {
    render(<Dropdown config={mockConfig} />);

    expect(screen.getByRole('button', { name: /dropdown/i })).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('It opens dropdown with correct options when button is clicked', () => {
    render(<Dropdown config={mockConfig} />);

    expect(screen.getByRole('button', { name: /dropdown/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /dropdown/i }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.queryByText(/option 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/option 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/option 3/i)).toBeInTheDocument();
  });

  test('It selects option when clicked and closes dropdown', () => {
    render(<Dropdown config={mockConfig} />);

    fireEvent.click(screen.getByRole('button', { name: /dropdown/i }));
    fireEvent.click(screen.getByText(/option 1/i));

    expect(mockConfig.data[0].onClick).toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('It selects option when clicked and keeps the dropdown open when selecting an option with persist', () => {
    render(<Dropdown config={mockConfig} />);

    fireEvent.click(screen.getByRole('button', { name: /dropdown/i }));
    fireEvent.click(screen.getByText(/option 2/i));

    expect(mockConfig.data[1].onClick).toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });

  test('It closes dropdown when clicking outside', () => {
    render(<Dropdown config={mockConfig} />);

    fireEvent.click(screen.getByRole('button', { name: /dropdown/i }));
    fireEvent.click(document.body);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
