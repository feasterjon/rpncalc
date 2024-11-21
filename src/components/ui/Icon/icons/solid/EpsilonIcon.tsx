import type { Icon as IconType } from '../../types/icon';

export function EpsilonIcon({ styles = 'h-6 w-6' }: IconType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
      <path d="m 170,250 q -84.39844,-29.98952 -84.39844,-90.8241 0,-47.98325 44.55653,-76.68718 44.9843,-28.70393 111.38902,-28.70393 60.40681,0 95.96418,20.13599 35.55967,19.70731 35.55967,47.55548 0,14.56631 -11.14584,25.70498 -11.13312,10.71022 -25.70498,10.71022 -23.99162,0 -39.41646,-33.41624 -21.42089,-46.26989 -64.2636,-46.26989 -33.84401,0 -55.69451,22.2778 -21.85004,22.27757 -21.85004,62.12018 0,78.40053 80.97172,78.40053 8.56679,0 19.70731,-1.71343 19.28023,-2.56841 29.98952,-2.56841 26.13274,0 26.13274,14.99453 0,16.70835 -26.56281,16.70835 -9.42207,0 -28.27617,-2.99941 -14.13855,-2.56842 -21.85004,-2.56842 -85.68404,0 -85.68404,87.39739 0,42.4131 22.70672,68.54815 22.70672,25.70498 63.40577,25.70498 50.9822,0 67.69032,-52.69555 8.56679,-27.84841 18.8497,-38.55863 10.71161,-10.71021 28.27618,-10.71021 14.56608,0 26.13274,10.71021 12.00159,10.28176 12.00159,26.56282 0,38.98638 -43.69869,64.69136 -43.69871,25.27722 -105.82119,25.27722 -68.11808,0 -121.2414,-32.56072 -52.69555,-32.56072 -52.69555,-86.96963 0,-68.11808 104.96335,-100.25104 z" />
    </svg>
  );
}