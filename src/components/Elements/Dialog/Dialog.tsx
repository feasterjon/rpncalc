import { Icon } from '../Icon';
import styles from './Dialog.module.css';
import { vibrate } from '../../../utils/vibrate';

type DialogProps = {
  cancelable?: boolean;
  children: React.ReactNode;
  close: () => void;
  darkMode?: boolean;
  footer?: React.ReactNode;
  title?: string;
  vibrateEnabled?: boolean;
};

export function Dialog({
  cancelable = true,
  children,
  close,
  darkMode,
  footer,
  title,
  vibrateEnabled = false
}: DialogProps) {

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const closestDialog = target.closest(`.${styles.dialog}`);
    if (cancelable && !closestDialog) {
      close();
    }
  };

  return (
    <div className={styles.mask} onClick={handleClickOutside} data-testid="dialog-mask">
      <div className={`
          ${styles.dialog}
          ${darkMode ? styles.containerDark : styles.containerLight}
        `}>
        {title && (
          <div className={styles.header}>
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.controls}>
              <button className={`
                ${styles.button}
                ${styles.rounded}
                ${darkMode ? styles.bgTransparentDark : styles.bgTransparentLight}
              `} onClick={vibrateEnabled ? () => { vibrate(); close(); } : () => { close(); }}>
                <Icon id="x-mark" />
              </button>
            </div>
          </div>
        )}
        <div className={styles.body}>
          {children}
        </div>
        <div className={styles.footer}>
          {footer && (
            <div className={styles.content}>{footer}</div>
          )}
          <div className={styles.controls} style={footer ? { textAlign: 'right'} : { textAlign: 'center'}}>
            <button className={styles.button} onClick={vibrateEnabled ? () => { vibrate(); close(); } : () => { close(); }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}