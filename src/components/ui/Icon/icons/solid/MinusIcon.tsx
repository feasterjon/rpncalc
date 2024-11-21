import type { Icon as IconType } from '../../types/icon';

export function MinusIcon({ styles = 'h-6 w-6' }: IconType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );
}