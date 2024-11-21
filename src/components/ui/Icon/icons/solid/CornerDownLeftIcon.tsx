import type { Icon as IconType } from '../../types/icon';

export function CornerDownLeftIcon({ styles = 'h-6 w-6' }: IconType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={styles}>
      <polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}