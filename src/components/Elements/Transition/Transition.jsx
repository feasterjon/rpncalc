import styles from './Transition.module.css';

export function Transition(props) {
  return (
    <div className={`${props.show ? styles.fadeVisible : styles.fadeHidden}`}>
      {props.children}
    </div>
  );
}