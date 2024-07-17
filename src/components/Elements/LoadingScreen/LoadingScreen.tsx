import { Spinner } from '../Spinner';
import styles from './LoadingScreen.module.css';

type LoadingScreenProps = {
  adaptive?: boolean;
  bg?: string;
  bgColor?: string;
  bgGradient?: boolean;
  children?: React.ReactNode;
  darkMode?: boolean;
  loading?: boolean;
  message?: string;
  spinnerVisible?: boolean;
};

export function LoadingScreen({
  adaptive = false,
  bg,
  bgColor,
  bgGradient = false,
  children,
  darkMode = false,
  loading = true,
  message,
  spinnerVisible = true
}: LoadingScreenProps) {
  return (
    <>
      {loading ? (
        <div
          className={`
            ${bg === 'waves' ? styles.waves : ''}
            ${bgGradient ? styles.gradient : ''}
            ${styles.main}
            ${darkMode ? styles.mainDark : styles.mainLight}
            ${adaptive ? styles.mainAdaptive : ''}
            ${styles.vars}
          `}

          style={{
            backgroundColor: bgColor
          }}
        data-testid="loading-screen">
          {spinnerVisible && (
            <div data-testid="spinner">
              <Spinner adaptive={adaptive} darkMode={darkMode} />
            </div>
          )}
          {message && (
            <div data-testid="message">
              {message}
            </div>
          )}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}