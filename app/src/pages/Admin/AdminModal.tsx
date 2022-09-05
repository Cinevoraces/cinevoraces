import { Button } from 'components/Inputs/InputsLib';
import styles from './AdminModal.module.scss';

type AdminModalProps = {
  children?: import('react').ReactNode,
  handler?: React.MouseEventHandler<HTMLElement>,
};

function AdminModal ({children, handler}: AdminModalProps) {
  return(
    <>
      <div 
        className={styles['modal-background']}
        onClick={handler}
      />
      <div className={styles['modal']}>
        <button 
          className={styles['close']}
          onClick={handler}
        >X</button>
        <div className={styles['content']}>
          { children }
        </div>
        <div className={styles['buttons']}>
          <Button
            styleMod='fill-rounded'
            handler={handler}
          >
            Fermer
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminModal;