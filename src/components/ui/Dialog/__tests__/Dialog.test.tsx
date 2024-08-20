import { vi, describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from '../Dialog';
import { vibrate } from '../../../../utils/vibrate';  

vi.mock('../../../../utils/vibrate', () => ({
  vibrate: vi.fn()
}));

describe('Dialog Component', () => {
  test('renders dialog with title content, and footer', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock} footer="Test Footer">
        <div>Test Content</div>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  test('It does not close dialog when clicking inside if cancelable', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock} cancelable>
        <div data-testid="dialog-content">Test Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId('dialog-content'));
    expect(closeMock).toHaveBeenCalledTimes(0);
  });

  test('It closes dialog when clicking outside if cancelable', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock} cancelable>
        <div data-testid="dialog-content">Test Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId('dialog-mask'));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test('It does not close dialog when clicking outside if not cancelable', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock} cancelable={false}>
        <div data-testid="dialog-content">Test Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId('dialog-mask'));
    expect(closeMock).toHaveBeenCalledTimes(0);
  });

  test('It closes dialog when close button is clicked', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock}>
        <div>Test Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test('It calls vibrate function when vibrateEnabled is true', () => {
    const closeMock = vi.fn();
    render(
      <Dialog title="Test Dialog" close={closeMock} vibrateEnabled>
        <div>Test Content</div>
      </Dialog>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(vibrate).toHaveBeenCalledTimes(1);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
