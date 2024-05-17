import styles from './Transition.module.css';

type TransitionProps = {
  children: React.ReactNode;
  show: boolean;
};

export function Transition({ children, show }: TransitionProps) {
  return (
    <div className={`${show ? styles.fadeVisible : styles.fadeHidden}`}>
      {children}
    </div>
  );
}