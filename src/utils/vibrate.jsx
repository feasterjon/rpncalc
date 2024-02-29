export function vibrate(pattern = [50]) {
  if (typeof window.navigator.vibrate !== 'function') return
  window.navigator.vibrate(pattern);
}