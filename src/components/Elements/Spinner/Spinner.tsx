import styles from './Spinner.module.css';

type SpinnerProps = {
  adaptive?: boolean;
  darkMode?: boolean;
};

export function Spinner({ adaptive = false, darkMode }: SpinnerProps) {
  return (
    <div className={`
      ${styles.spinner}
      ${darkMode ? styles.spinnerDark : styles.spinnerLight}
      ${adaptive ? styles.spinnerAdaptive : ''}
      ${styles.vars}
    `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}