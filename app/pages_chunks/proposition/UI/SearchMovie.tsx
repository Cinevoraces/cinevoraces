import { forwardRef } from 'react';
import { RefTextInput, Button } from '@components/Input';
import { MagnifyingGlassSvg } from '@components/SvgComponents';
import type { FormEvent } from 'react';

interface SearchMovieProps {
  handleMovieSearch: (e: FormEvent)=>Promise<void>;
}

const SearchMovie = forwardRef<HTMLInputElement, SearchMovieProps>((props, ref) => {
  SearchMovie.displayName = 'MovieSearch';
  const { handleMovieSearch } = props;
  return (
    <section className='w-full flex items-start flex-col gap-4'>
      <div className='custom-container py-8 w-full flex items-start flex-col gap-4'>
        <h2 className='w-full title-section'>2 - Recherchez votre film</h2>
        <p>Afin de permettre à <span className='emphasis'>l’ensemble de la communauté d’interagir</span>,
            veillez bien à l’accessibilité du film que vous proposerez
            (disponibilité sur les principales plateformes de streaming, bon référencement sur internet...).
            Mais tâchez tout de même de nous <span className='emphasis'>surprendre</span> dans votre sélection !<br/>
            Plus un film est <span className='emphasis'>accessible</span>, plus il sera regardé.
        </p>
        <form 
          action="submit"
          onSubmit={handleMovieSearch}
          className='w-full flex gap-4 items-center flex-wrap'>
          <RefTextInput
            type='search'
            id='movieSearch'
            placeholder='Rechercher un titre de film...'
            ref={ref}
          />
          <Button>
            <MagnifyingGlassSvg
              style='w-6 h-6 '/>
          </Button>
        </form>
      </div>
    </section>
  );
});

export default SearchMovie;
