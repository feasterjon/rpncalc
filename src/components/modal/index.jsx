import styles from './index.module.css';
import { vibrate } from './helpers';
import { useEffect, useState } from 'react';

export function Modal(props) {

  /*
  const handleClickOutside = (event) => {
    if (event.target.closest('.mask')) return
    props.close();
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  */

  return (
    <div className={styles.mask}>
      <div className={styles.wrapper}>
        <div className={`
          ${styles.container}
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
            <button onClick={() => {vibrate(); props.close();}}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}