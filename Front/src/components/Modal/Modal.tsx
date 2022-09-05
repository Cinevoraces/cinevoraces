import ReactDOM from 'react-dom';
import { ReactComponent as SVGClose } from './Modal.ico_close.svg';
import { useAppDispatch } from 'redux/hooks';
import { toggleModal } from 'redux/slices/global';
import styles from './Modal.module.scss';

type ModalProps = {
  children : React.ReactNode
}

// Append modal outside of App with a portal
const portal = document.getElementById('portal') as HTMLElement;

/**
 * @returns empty modal
 */
function Modal({children} : ModalProps) {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    dispatch(toggleModal());
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles['modal-background']} onClick={handleCloseModal}/>
      <div className={`${styles.modal} ${styles['scale-up-center']}`}>
        <button className={styles.close} onClick={handleCloseModal}>
          <SVGClose/>
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
    , portal);
};

export default Modal;