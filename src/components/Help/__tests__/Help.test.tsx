import { describe, expect, test } from 'vitest';
import { CONFIG } from "@/testing/mocks/config";
import { render, screen } from '@testing-library/react';
import { Help } from '../Help';

const mockConfig = CONFIG.help;

describe('Help Component', () => {

  test('It renders the component', () => {

    render(<Help config={mockConfig} />);

    const logo = screen.getByAltText('My Logo');

    expect(logo).toHaveAttribute('src', 'images/logo.png');
    expect(logo).toHaveStyle({ width: '50%' });
    expect(screen.getByText('Help Footer')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Data 1')).toBeInTheDocument();
    expect(screen.getByText('Data 3')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
    expect(screen.getByText('Help Title')).toBeInTheDocument();
  });
});
