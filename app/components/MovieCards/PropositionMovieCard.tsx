import { useState, useRef } from 'react';
import Image from 'next/image';
import cutText from '@utils/cutText';
import dateFormater from '@utils/dateFormater';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import Modal from '@components/Modal';
import type { MovieWithPresentation, Presentation } from '@custom_types/index';

interface PropositionMovieCardProps {
  movie: MovieWithPresentation;
  propositionCardStyle: string;
  posterStyle: string;
}

const PropositionMovieCard = ({ movie, propositionCardStyle, posterStyle }: PropositionMovieCardProps) => {
  const { poster_url, french_title, presentation: presentationObject, publishing_date, release_date } = movie;
  const presentationCaster = (presentationObject: string | Presentation) => {
    if (typeof presentationObject === 'object') return presentationObject.presentation;
    return presentationObject;
  };
  const [isPresentationModalOpened, setIsPresentationModalOpened] = useState<boolean>(false);
  const handleOpenPresentationModal = () => {
    setIsPresentationModalOpened(!isPresentationModalOpened);
  };
  const modalRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(modalRef, 'modal', isPresentationModalOpened, handleOpenPresentationModal);
  return (
    <>
      <div
        id="proposition_result_card"
        className={propositionCardStyle}>
        <Image
          src={poster_url ? poster_url : '/movie_posters/placeholder.jpg'}
          alt={`${french_title} movie poster`}
          width={150}
          height={(150 * 9) / 16}
          placeholder='blur'
          blurDataURL='/movie_posters/placeholder.jpg'
          className={posterStyle}
        />
        <div className="w-full h-fill px-3 py-1 flex flex-col justify-between gap-1">
          <div className="flex flex-col gap-1">
            <p className="text-lg">
              {french_title}
              <span className="text-sm font-light">{release_date ? ` (${release_date.slice(0, 4)})` : ''}</span>
            </p>
            <p className="text-sm text-start">{cutText(presentationCaster(presentationObject), 60)}</p>
          </div>
          <p className="text-xs font-semibold justify-self-end">{`Membre : ${presentationObject.author_pseudo} `}</p>
          <p className="text-sm justify-self-end">
            {`Publication le : ${dateFormater(publishing_date)}`}
          </p>
          <a onClick={handleOpenPresentationModal} className='text-xs text-orange-primary self-end justify-self-end hover:underline'>
            Lire la présentation
          </a>
        </div>
      </div>
      {
        isPresentationModalOpened && (
          <Modal
            stateValue={isPresentationModalOpened}
            setter={setIsPresentationModalOpened}
            ref={modalRef}>
            <p>{presentationObject.presentation}</p>
          </Modal>
        )
      }
    </>
  );
};

export default PropositionMovieCard;
