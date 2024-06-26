type IconProps = {
  id?: string;
  styles?: string;
};

export function Icon({ id, styles = 'h-6 w-6' }: IconProps) {
  switch (id) {
    case 'angle-up':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      );
    case 'check':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      );
    case 'chevron-up':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      );
    case 'circle-half-stroke':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className={styles}>
         <path d="m 12,2.82353 c -5.06235,0 -9.17647,4.11412 -9.17647,9.17647 0,5.062351 4.11412,9.176471 9.17647,9.176471 5.06235,0 9.17647,-4.11412 9.17647,-9.176471 0,-5.06235 -4.11412,-9.17647 -9.17647,-9.17647 z m 0,16.823531 V 4.35294 c 4.21353,0 7.64706,3.43353 7.64706,7.64706 0,4.213531 -3.43353,7.647061 -7.64706,7.647061 z" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
      );
    case 'clock':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'corner-down-left':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={styles}>
           <polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" />
        </svg>
      );
    case 'delete-left':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" className={styles}>
          <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      );
    case 'divide':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="M272 96a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 320a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
        </svg>
      );
    case 'ellipsis-vertical':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      );
    case 'epsilon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="m 170,250 q -84.39844,-29.98952 -84.39844,-90.8241 0,-47.98325 44.55653,-76.68718 44.9843,-28.70393 111.38902,-28.70393 60.40681,0 95.96418,20.13599 35.55967,19.70731 35.55967,47.55548 0,14.56631 -11.14584,25.70498 -11.13312,10.71022 -25.70498,10.71022 -23.99162,0 -39.41646,-33.41624 -21.42089,-46.26989 -64.2636,-46.26989 -33.84401,0 -55.69451,22.2778 -21.85004,22.27757 -21.85004,62.12018 0,78.40053 80.97172,78.40053 8.56679,0 19.70731,-1.71343 19.28023,-2.56841 29.98952,-2.56841 26.13274,0 26.13274,14.99453 0,16.70835 -26.56281,16.70835 -9.42207,0 -28.27617,-2.99941 -14.13855,-2.56842 -21.85004,-2.56842 -85.68404,0 -85.68404,87.39739 0,42.4131 22.70672,68.54815 22.70672,25.70498 63.40577,25.70498 50.9822,0 67.69032,-52.69555 8.56679,-27.84841 18.8497,-38.55863 10.71161,-10.71021 28.27618,-10.71021 14.56608,0 26.13274,10.71021 12.00159,10.28176 12.00159,26.56282 0,38.98638 -43.69869,64.69136 -43.69871,25.27722 -105.82119,25.27722 -68.11808,0 -121.2414,-32.56072 -52.69555,-32.56072 -52.69555,-86.96963 0,-68.11808 104.96335,-100.25104 z" />
        </svg>
      );
    case 'eye':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    case 'eye-slash':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      );
    case 'minus':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      );
    case 'moon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      );
    case 'multiply':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512" className={styles}>
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      );
    case 'phi':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="m 202.49827,319.39255 v -34.95167 c 0,-48.80635 0.95963,-83.39049 2.89377,-103.75242 1.92694,-20.35473 5.12059,-38.02537 9.58863,-53.01961 8.10456,-26.12019 19.55248,-46.017179 34.35191,-59.69192 14.79942,-13.674741 32.43264,-20.512111 52.90733,-20.512111 24.92785,0 45.8075,11.343317 62.63079,34.014598 16.82377,22.678473 25.23541,51.932343 25.23541,87.768323 0,49.40612 -12.87249,89.59066 -38.60259,120.56851 C 325.77342,320.79409 291.93875,337.09343 250,338.7128 V 463.46482 H 202.49827 V 338.7128 C 154.06666,335.26389 116.52925,320.03743 89.884141,293.0027 63.239509,265.97566 49.916953,229.58453 49.916953,183.82261 c 0,-42.50877 8.65923,-75.86314 25.992563,-100.06407 17.325657,-24.193255 40.881714,-36.293721 70.674894,-36.293721 14.38679,0 27.25208,3.696018 38.6026,11.080858 11.35051,7.38484 21.27693,18.660503 29.79366,33.834667 l -14.91938,9.116496 c -5.88542,-10.533391 -12.63258,-18.330392 -20.23478,-23.398683 -7.6022,-5.06829 -16.27582,-7.602196 -26.00744,-7.602196 -17.24361,0 -29.50865,8.359345 -36.81048,25.070358 -7.30231,16.718691 -10.95323,45.432771 -10.95323,86.156621 0,40.11689 8.20916,71.92722 24.64284,95.43098 16.42601,23.50376 40.3568,37.58298 71.80007,42.23863 z M 250,320 c 34.59182,0 62.90812,-13.92233 84.95708,-41.78137 22.04896,-27.85905 33.07752,-63.86824 33.07752,-108.04101 0,-30.58823 -5.81776,-55.05114 -17.44561,-73.389211 -11.63552,-18.338067 -26.75739,-27.506861 -45.36511,-27.506861 -20.43726,0 -34.74919,9.221573 -42.93581,27.657043 C 254.09331,115.37358 250,148.90069 250,197.5271 Z" />
        </svg>
      );
    case 'pi':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="m 429.95558,58.1485 v 61.78826 h -98.1824 l -8.46242,128.65398 q -2.53348,33.434 -2.53348,57.97846 0,58.82584 13.54262,71.94317 13.96632,12.69615 33.434,12.69615 40.6265,0 48.2461,-51.20852 h 15.23488 q -13.96631,117.6494 -93.95004,117.6494 -37.24152,0 -60.0935,-22.85197 -22.4301,-22.85198 -22.4301,-67.7131 0,-29.6242 8.89137,-125.26673 l 11.42644,-121.88175 h -89.71997 q -8.89137,154.04582 -21.58364,225.14389 -12.27131,71.09807 -27.50688,91.83501 -14.81255,20.73693 -40.62649,20.73693 -19.46768,0 -33.00916,-11.42621 -13.11619,-11.42622 -13.11619,-30.04675 0,-17.77452 22.85197,-48.66865 33.43172,-44.85884 49.9363,-93.10494 16.50504,-48.66865 24.96929,-154.46837 h -28.77681 q -34.70393,0 -53.32355,15.65834 -18.1973,15.23534 -34.70165,44.01375 H 15.23488 Q 27.5062,134.32517 46.9764,105.12581 66.44271,75.92416 86.7555,67.0369 q 20.73762,-8.88749 73.21311,-8.88749 z" />
        </svg>
      );
    case 'plus':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className={styles}>
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      );
    case 'question-mark-circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      );
    case 'square-root-variable':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" className={styles}>
          <path d="M282.6 78.1c8-27.3 33-46.1 61.4-46.1H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H344L238.7 457c-3.6 12.3-14.1 21.2-26.8 22.8s-25.1-4.6-31.5-15.6L77.6 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H77.6c22.8 0 43.8 12.1 55.3 31.8l65.2 111.8L282.6 78.1zM393.4 233.4c12.5-12.5 32.8-12.5 45.3 0L480 274.7l41.4-41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L525.3 320l41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L480 365.3l-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 320l-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3z" />
        </svg>
      );
    case 'sun':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      );
    case 'trash':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      );
    case 'x-mark':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      );
  }
}