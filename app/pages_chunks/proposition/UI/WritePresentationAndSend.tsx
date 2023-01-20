import { forwardRef } from 'react';
import Image from 'next/image';
import { TextAreaRef, Button } from '@components/Input';
import SendLogo from '@public/icons/send-icon.svg';
import type { FormEvent } from 'react';
import type { TMDBMovie } from 'models/custom_types/index';
import type { EpisodeOption } from 'models/custom_types/index';

interface WritePresentationAndSendProps {
  searchResults: TMDBMovie[];
  selectedMovieId: number;
  handlePropositionSubmit: (e: FormEvent)=>Promise<void>;
  episode: EpisodeOption;
}
const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

const WritePresentationAndSend = forwardRef<HTMLTextAreaElement, WritePresentationAndSendProps>((props, ref) => {
  WritePresentationAndSend.displayName = 'WritePresentationAndSend';
  const { searchResults, selectedMovieId, handlePropositionSubmit, episode } = props;
  return (
    <section className='custom-container py-8 flex flex-col gap-8'>
      <h2 className='title-section w-full'>4 - Présentez votre film</h2>
      <div className='w-full'>
        <p className='w-full '>
          <span className='emphasis'>
            {'Pourquoi '}
          </span>
          <span className='emphasis'>
            { (searchResults && searchResults.length > 0 && selectedMovieId !== 0) 
              ? searchResults.filter((m) => m.id === selectedMovieId)[0].title
              : 'ce film'
            }
          </span>
          {' particulièrement ?'}<br/>
        </p>
        <p>
            Son ambiance ?<br/>Ses personnages ?<br/>Son scénario ?<br/>
            Partagez avec nous cet univers et les raisons pour lesquelles nous devrions nous jeter dessus !
        </p>
      </div>
      <form
        action='submit'
        onSubmit={handlePropositionSubmit}
        className='w-full flex flex-col gap-2'>
        <TextAreaRef
          id='presentation'
          customStyle='light'
          ref={ref}
          placeholder={`Ma présentation ${ (searchResults && searchResults.length > 0 && selectedMovieId !== 0) 
            ? 'de ' + searchResults
              .filter((m) => m.id === selectedMovieId)[0].title + '...'
            : 'du film...'
          }`}
          minLength={250}
          errorMessage='Étoffez davantage votre présentation.'
        />
        <p className={helpingTextStyle}>
          {
            'Doit comporter au moins 250 caractères.'
          }
        </p>
        <div className='w-full flex flex-col gap-2 items-end'>
          <Button 
            customStyle='rounded' 
            disabled={!(episode.value !== '0' && selectedMovieId !== 0) ? true : false}>
            <Image src={SendLogo} alt='' width={16} height={16}/>
              Publier
          </Button>
          <p className={!(episode.value !== '0' && selectedMovieId !== 0) ? 'text-sm font-light text-red-500 text-right' : 'hidden'}>
            {
              (episode.value === '0') 
                ? 'Selectionnez un épisode.' 
                : (selectedMovieId === 0) 
                    && 'Selectionnez un film'
            }
          </p>
        </div>
      </form>
    </section>
  );
});

export default WritePresentationAndSend;
