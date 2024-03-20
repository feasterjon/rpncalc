import { Spinner } from '../Spinner';
import styles from './LoadingScreen.module.css';

export function LoadingScreen(props) {
  return (
    <div className={`${styles.main} ${styles.vars}`}>
      <div>
        <Spinner />
      </div>
      {props.message && (
        <div>
          {props.message}
        </div>
      )}
    </div>
  );
}