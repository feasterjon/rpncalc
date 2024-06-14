import { Spinner } from '../Spinner';
import styles from './LoadingScreen.module.css';

type LoadingScreenProps = {
  adaptive?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  message?: string;
};

export function LoadingScreen({ adaptive = false, children, loading = true, message }: LoadingScreenProps) {
  return (
    <>
      {loading ? (
        <div className={`
          ${styles.main}
          ${adaptive ? styles.mainAdaptive : ''}
          ${styles.vars}
        `}>
          <div>
            <Spinner adaptive={adaptive} />
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