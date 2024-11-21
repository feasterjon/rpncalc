import type { Icon as IconType } from '../../types/icon';

export function CircleHalfStrokeIcon({ styles = 'h-6 w-6' }: IconType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className={styles}>
      <path d="m 12,2.82353 c -5.06235,0 -9.17647,4.11412 -9.17647,9.17647 0,5.062351 4.11412,9.176471 9.17647,9.176471 5.06235,0 9.17647,-4.11412 9.17647,-9.176471 0,-5.06235 -4.11412,-9.17647 -9.17647,-9.17647 z m 0,16.823531 V 4.35294 c 4.21353,0 7.64706,3.43353 7.64706,7.64706 0,4.213531 -3.43353,7.647061 -7.64706,7.647061 z" />
    </svg>
  );
}