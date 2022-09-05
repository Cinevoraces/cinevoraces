import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { removeToast } from 'redux/slices/global';
import styles from './Toast.module.scss';

type ToastProps = {
  type: string,
  text: string,
  duration?: number,
}

/**
 * @returns Toast
 * @param   type      define style 'error'|'success'|'warn'
 * @param   text      text to render
 * @param   duration  self-remove timer
 */
function Toast({type, text, duration}: ToastProps) {
  const dispatch = useAppDispatch();
  const [fadeout, setFadeout] = useState<string>();

  useEffect(() => {
    setTimeout(()=> {
      setFadeout(styles['blur-out']);
    }, 2900);
    setTimeout(()=> {
      dispatch(removeToast());
      // Self-remove in 3s if duration is unset
    }, duration ? duration : 3000);
  }, [duration]);

  return (
    <div className={`${styles.wrapper} ${fadeout} ${styles[`wrapper--${type}`]}`}>
      <span className={styles.toast_text}>{text}</span>
    </div> 
  );
}

export default Toast;