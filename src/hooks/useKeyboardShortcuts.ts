import { useEffect } from 'react';

export const useKeyboardShortcuts = (
  toggleAppHistoryVisible: () => void,
  toggleDialogVisibleHelp: () => void,
  appHistoryVisible: boolean,
  dialogVisibleHelp: boolean
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === '/') || e.key === '?') {
        toggleDialogVisibleHelp();
      }
      if (!e.ctrlKey && e.key === 'h') { // exclude ctrlKey as browsers may access browser history via Ctrl + h
        toggleAppHistoryVisible();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    toggleAppHistoryVisible,
    toggleDialogVisibleHelp,
    appHistoryVisible,
    dialogVisibleHelp
  ]);
}