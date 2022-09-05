import { Button } from 'components/Inputs/InputsLib';
import AdminModal from './AdminModal';
import styles from './Admin.module.scss';
import { useState } from 'react';

function Proposal ({movie, handleSelect}: {[key: string]: any}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const handleModal = (e: any) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  return(
    <>
      { modalIsOpen &&
        <AdminModal
          handler={handleModal}
        >
          {movie.presentation}
        </AdminModal>
      }
      <div 
        className={styles['proposal-container']}
        id={movie.id}
        onClick={handleSelect}
      >
        <div className={styles['film-info']}>
          <div className={styles['title']}>
            {movie.french_title}
          </div>
          <div>
            {movie.publishing_date.slice(0, 10)}
          </div>
          <div>
            (Id: {movie.user_id}) {movie.user_pseudo}
          </div>
          <Button
            styleMod='rounded'
            handler={handleModal}
          >Présentation</Button>
        </div>
        <div className={styles['cover']}>
          <img src={movie.poster_url} alt=''/>
        </div>
      </div>
    </>
  );
};

export default Proposal;