import { Spinner } from '../Spinner';
import styles from './LoadingMessage.module.css';

type LoadingMessageProps = {
  adaptive?: boolean;
  children?: React.ReactNode;
  darkMode?: boolean;
  loading: boolean;
  message?: string;
};

export function LoadingMessage({ adaptive = false, children, darkMode, loading = true, message }: LoadingMessageProps) {
  return (
    <>
      {loading ? (
        <div className={`
          ${styles.main}
          ${darkMode ? styles.mainDark : styles.mainLight}
          ${adaptive ? styles.mainAdaptive : ''}
          ${styles.vars}
        `} data-testid="loading-message">
          <div>
            <Spinner adaptive={adaptive} darkMode={darkMode} />
          </div>
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