import styles from './index.module.css';
import { vibrate } from './helpers';

export function Modal(props) {

  const cancelable = (props.cancelable !== false) ? true : false;

  const handleClickOutside = (event) => {
    if (cancelable && !event.target.closest(`.${styles.modal}`)) {
      props.close();
    }
  };

  return (
    <div className={styles.mask} onClick={handleClickOutside}>
      <div className={`
          ${styles.modal}
          ${props.darkMode ? styles.containerDark : styles.containerLight}
        `}>
        {props.header && (
          <div className={styles.header}>
            {props.header}
          </div>
        )}
        {props.body && (
          <div className={styles.body}>
            {props.body}
          </div>
        )}
        {props.footer && (
          <div className={styles.footer}>
            {props.footer}
          </div>
        )}
        <div className={styles.controls}>
          <button onClick={() => { vibrate(); props.close(); }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}