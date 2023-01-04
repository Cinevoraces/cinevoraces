import Image from 'next/image';
import Rate from '@components/Rate';

const dataTitleStyle = 'text-lg uppercase text-light-gray pr-4 ';
const dataStyle = 'text-white ';
const hListStyle = 'flex items-baseline flex-wrap';
const hListTypeStyle = dataTitleStyle + 'flex-shrink-0 ';
const hListDataStyle = 'text-orange-primary flex-1 flex gap-1 items-end flex-wrap ';

interface PosterProps {
  poster_url: string;
  french_title: string;
}
const Poster = ({ poster_url, french_title }: PosterProps) => {
  return (
    <div
      id="image-container"
      className="relative h-fit self-center xl:w-full
        before:content-[''] before:absolute before:-inset-0.5 before:bg-gradient-to-tr before:from-dark-gray before:to-orange-primary before:rounded-xl">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}${poster_url}`}
        alt={`Affiche de ${french_title}`}
        width={2*240}
        height={(2*240 * 9) / 16}
        className="relative z-10 rounded-xl self-center w-full "
      />
    </div>
  );
};

interface TitleProps {
  french_title: string;
  release_date: string;
}
const Title = ({ french_title, release_date }: TitleProps) => {
  return (
    <h1 className="mb-6 text-3xl font-semibold text-white">
      {french_title + ' '}
      <span className="text-base font-light text-light-gray">{`(${release_date?.slice(0, 4)})`}</span>
    </h1>
  );
};
interface OriginalTitleProps {
  original_title: string;
}
const OriginalTitle = ({ original_title }: OriginalTitleProps) => {
  return (
    <div
      id="original-title"
      className={hListStyle}>
      <p className={hListTypeStyle}>Titre original :</p>
      <p className={dataStyle}>{original_title}</p>
    </div>
  );
};
interface RatingProps {
  rate: number;
  type: 'global' | 'user';
}
const Rating = (props: RatingProps) => {
  return (
    <div
      id="global-rating"
      className={'flex items-center justify-between gap-0 '}>
      <p className={hListTypeStyle + 'sm:-mr-[30px]'}>
        {
          (props.type === 'global') ? 'Note globale :' : 'Ma note :'
        }
      </p>
      <Rate {...props} />
    </div>
  );
};
interface DirectorsProps {
  directors: string[];
}
const Directors = ({ directors }: DirectorsProps) => {
  return (
    <div
      id="directors"
      className={hListStyle}>
      <p className={dataTitleStyle + 'place-self-start'}>{'Réalisation :'}</p>
      <ul className={dataStyle + 'mt-1 flex-1 flex flex-col'}>
        {directors.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
};
interface GenresProps {
  genres: string[];
}
const Genres = ({ genres }: GenresProps) => {
  return (
    <div
      id="genres"
      className={hListStyle}>
      <p className={hListTypeStyle}>{genres.length > 1 ? 'Genres :' : 'Genre :'}</p>
      <ul className={hListDataStyle}>
        {genres.map((g, i) => (
          <li key={g}>{i != genres.length - 1 ? `${g},` : g}</li>
        ))}
      </ul>
    </div>
  );
};
interface CountriesProps {
  countries: string[];
}
const Countries = ({ countries }: CountriesProps) => {
  return (
    <div
      id="countries"
      className={hListStyle}>
      <p className={hListTypeStyle}>{countries.length > 1 ? 'Pays :' : 'Genre :'}</p>
      <ul className={hListDataStyle}>
        {countries.map((c, i) => (
          <li key={c}>{i != countries.length - 1 ? `${c},` : c}</li>
        ))}
      </ul>
    </div>
  );
};
interface LanguagesProps {
  languages: string[];
}
const Languages = ({ languages }: LanguagesProps) => {
  return (
    <div
      id="languages"
      className={hListStyle}>
      <p className={hListTypeStyle}>{languages.length > 1 ? 'Langues :' : 'Langue :'}</p>
      <ul className={hListDataStyle}>
        {languages.map((l, i) => (
          <li key={l}>{i != languages.length - 1 ? `${l},` : l}</li>
        ))}
      </ul>
    </div>
  );
};
interface RuntimeProps {
  runtime: number;
}
const Runtime = ({ runtime }: RuntimeProps) => {
  return (
    <div
      id="runtime"
      className="flex items-center">
      <p className={dataTitleStyle}>Durée :</p>
      <p className={dataStyle}>{`${runtime} min.`}</p>
    </div>
  );
};
interface CastingProps {
  casting: string[];
}
const Casting = ({ casting }: CastingProps) => {
  return (
    <div
      id="casting"
      className="flex justify-between items-center">
      <p className={dataTitleStyle + 'place-self-start'}>{'Casting :'}</p>
      <ul className={dataStyle + 'mt-1 flex-1 flex flex-col'}>
        {casting.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  );
};

export {
  Poster,
  Title,
  OriginalTitle,
  Rating,
  Directors,
  Genres,
  Countries,
  Languages,
  Runtime,
  Casting,
};
