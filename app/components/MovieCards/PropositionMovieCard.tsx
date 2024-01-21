import Modal from '@components/Modal';
import Poster from '@components/Poster';
import RichText from '@components/RichText';
import cutText from '@utils/cutText';
import dateFormater from '@utils/dateFormater';
import type { MovieWithPresentation, Presentation } from 'models/custom_types/index';
import { useState } from 'react';

interface PropositionMovieCardProps {
  movie: MovieWithPresentation;
  propositionCardStyle: string;
  posterStyle: string;
}

/**
 *
 * @param movie movie object
 * @param propositionCardStyle
 * @param posterStyle
 * @returns a wrapper with a movie presentation card and a specific modal to display the complete presentation
 */
const PropositionMovieCard = ({ movie, propositionCardStyle, posterStyle }: PropositionMovieCardProps) => {
  const {
    id: movie_id_administration,
    movie_id: movie_id_user,
    french_title,
    presentation: presentationObject,
    publishing_date,
    release_date,
  } = movie;
  const id = movie_id_administration ? movie_id_administration : movie_id_user;
  const presentationCaster = (presentationObject: string | Presentation) => {
    if (typeof presentationObject === 'object') return presentationObject.presentation;
    return presentationObject;
  };
  const [isPresentationModalOpened, setIsPresentationModalOpened] = useState<boolean>(false);
  const handleOpenPresentationModal = () => {
    setIsPresentationModalOpened(!isPresentationModalOpened);
  };
  return (
    <>
      <div
        id="proposition_result_card"
        className={propositionCardStyle}>
        <Poster
          src={id ? `${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/1/${id}` : '/poster_placeholder.jpg'}
          title={french_title || 'placeholder'}
          type="card"
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
          <p className="text-sm justify-self-end">{`Publication le : ${dateFormater(publishing_date)}`}</p>
          <a
            onClick={handleOpenPresentationModal}
            className="text-xs text-orange-primary self-end justify-self-end hover:underline">
            Lire la présentation
          </a>
        </div>
      </div>
      {isPresentationModalOpened && (
        <Modal
          stateValue={isPresentationModalOpened}
          setter={setIsPresentationModalOpened}>
          <RichText>{presentationObject.presentation}</RichText>
        </Modal>
      )}
    </>
  );
};

export default PropositionMovieCard;
