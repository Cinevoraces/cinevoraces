import ReactDOM from 'react-dom';
import { useAppSelector } from 'redux/hooks';
import { globals } from 'redux/slices/global';
import Toast from './Toast';
import styles from './Toasts.module.scss';

// Append toats outside of App with a portal
const portal = document.getElementById('portal') as HTMLElement;

/**
 * @returns List of toasts
 */
function Toasts()  {
  const {toasts} = useAppSelector(globals);
  
  return ReactDOM.createPortal(
    (toasts.length > 0) && 
      <div className={`${styles.toast} ${styles['scale-up-left']}`}>
        {toasts.map(({type, text, duration}) => (
          <Toast 
            type={type} 
            text={text} 
            duration={duration}
          />))}
      </div>
    , portal);
};

export default Toasts;