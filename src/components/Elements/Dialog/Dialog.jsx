import { Icon } from '../Icon';
import styles from './Dialog.module.css';
import { vibrate } from '../../../utils/vibrate';

export function Dialog(props) {

  const cancelable = (props.cancelable !== false) ? true : false;

  const handleClickOutside = (event) => {
    if (cancelable && !event.target.closest(`.${styles.dialog}`)) {
      props.close();
    }
  };

  return (
    <div className={styles.mask} onClick={handleClickOutside}>
      <div className={`
          ${styles.dialog}
          ${props.darkMode ? styles.containerDark : styles.containerLight}
        `}>
        <div className={styles.header}>
          {props.title && (
            <div className={styles.title}>
              {props.title}
            </div>
          )}
          <div className={styles.controls}>
            <button className={`${styles.button} ${styles.rounded}`} onClick={() => { vibrate(); props.close(); }}>
              <Icon id="x-mark" />
            </button>
          </div>
        </div>
        {props.body && (
          <div className={styles.body}>
            {props.body}
          </div>
        )}
        <div className={styles.footer}>
          {props.footer && (
            <div className={styles.content}>{props.footer}</div>
          )}
          <div className={styles.controls}>
            <button className={styles.button} onClick={() => { vibrate(); props.close(); }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}