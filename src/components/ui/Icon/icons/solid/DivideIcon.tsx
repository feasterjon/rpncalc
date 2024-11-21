import type { Icon as IconType } from '../../types/icon';

export function DivideIcon({ styles = 'h-6 w-6' }: IconType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
      <path d="M272 96a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 320a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
    </svg>
  );
}