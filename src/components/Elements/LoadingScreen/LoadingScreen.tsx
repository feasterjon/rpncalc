import { Spinner } from '../Spinner';
import styles from './LoadingScreen.module.css';

type LoadingScreenProps = {
  message: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className={`${styles.main} ${styles.vars}`}>
      <div>
        <Spinner />
      </div>
      {message && (
        <div>
          {message}
        </div>
      )}
    </div>
  );
}