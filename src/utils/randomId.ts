export function randomId(): number {
  return Math.floor(Math.random() * (10 ** 10 - 10 ** 9 + 1)) + (10 ** 9); // random 10-digit positive integer
}