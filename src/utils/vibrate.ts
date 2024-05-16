export function vibrate(pattern: number | (number)[] = 50) {
  if (typeof window.navigator.vibrate !== 'function') return
  window.navigator.vibrate(pattern);
}