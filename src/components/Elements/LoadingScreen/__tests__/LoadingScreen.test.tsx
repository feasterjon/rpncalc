import { beforeAll, describe, expect, test } from 'vitest';
import { mockMatchMedia } from '../../../../__mocks__/matchMedia';
import { render, screen } from '@testing-library/react';
import styles from '../LoadingScreen.module.css';
import { LoadingScreen } from '../LoadingScreen';

const mockChildren = <div data-testid="mock-children">Test Children</div>;

beforeAll(() => {
  mockMatchMedia();
});

describe('LoadingScreen Component', () => {
  test('It renders loading screen with defaults', () => {

    const bgColor = '#ff0000';

    render(<LoadingScreen>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.mainLight);
    expect(loadingScreenElement).not.toHaveClass(styles.waves);
    expect(loadingScreenElement).not.toHaveClass(styles.gradient);
    expect(loadingScreenElement).not.toHaveClass(styles.mainAdaptive);
    expect(loadingScreenElement).not.toHaveStyle({ backgroundColor: bgColor });
  });

  test('It renders loading screen with message', () => {

    const message = "Test Loading...";

    render(<LoadingScreen message={message}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-children')).toBeNull();
  });

  test('It renders loading screen with message and without spinner', () => {

    const message = 'Test Loading...';

    render(<LoadingScreen message={message} spinnerVisible={false}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-children')).toBeNull();
  });

  test('It renders loading screen with adaptive', () => {
    render(<LoadingScreen adaptive={true}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.mainAdaptive);
  });

  test('It renders loading screen with darkMode', () => {
    render(<LoadingScreen darkMode={true}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.mainDark);
  });

  test('It renders loading screen with background (bg) waves', () => {
    render(<LoadingScreen bg="waves">{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.waves);
  });

  test('It renders loading screen with background (bg) set to an invalid value', () => {
    render(<LoadingScreen bg="test">{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).not.toHaveClass(styles.waves);
  });

  test('It renders loading screen with bgGradient', () => {
    render(<LoadingScreen bgGradient={true}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.gradient);
  });

  test('It renders loading screen with bgColor', () => {
    
    const bgColor = '#ff0000';

    render(<LoadingScreen bgColor={bgColor}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).not.toHaveClass(styles.gradient);
    expect(loadingScreenElement).toHaveStyle({ backgroundColor: bgColor });
  });

  test('It renders loading screen with bgColor and bgGradient', () => {
    
    const bgColor = '#ff0000';

    render(<LoadingScreen bgColor={bgColor} bgGradient={true}>{mockChildren}</LoadingScreen>);

    const loadingScreenElement = screen.getByTestId('loading-screen');

    expect(loadingScreenElement).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('message')).toBeNull();
    expect(screen.queryByTestId('mock-children')).toBeNull();
    expect(loadingScreenElement).toHaveClass(styles.gradient);
    expect(loadingScreenElement).toHaveStyle({ backgroundColor: bgColor });
  });

  test('It renders the children', () => {
    render(<LoadingScreen loading={false}>{mockChildren}</LoadingScreen>);
    expect(screen.queryByTestId('loading-screen')).toBeNull();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });
});