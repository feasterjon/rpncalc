import { Spinner } from '../Spinner';
import styles from './LoadingScreen.module.css';

type LoadingScreenProps = {
  adaptive?: boolean;
  children?: React.ReactNode;
  darkMode?: boolean;
  loading?: boolean;
  message?: string;
  spinnerVisible?: boolean;
};

export function LoadingScreen({
  adaptive = false,
  children,
  darkMode = false,
  loading = true,
  message,
  spinnerVisible = true
}: LoadingScreenProps) {
  return (
    <>
      {loading ? (
        <div className={`
          ${styles.main}
          ${darkMode ? styles.mainDark : styles.mainLight}
          ${adaptive ? styles.mainAdaptive : ''}
          ${styles.vars}
        `} data-testid="loading-screen">
          {spinnerVisible && (
            <div>
              <Spinner adaptive={adaptive} darkMode={darkMode} />
            </div>
          )}
          {message && (
            <div>
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