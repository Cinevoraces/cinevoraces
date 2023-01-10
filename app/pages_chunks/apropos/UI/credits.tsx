import { Button } from '@components/Input';
import Link from 'next/link';

const Credits = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="title-section">Crédits techniques :</h2>
      <p>
        <span className="emphasis">
              CinéVoraces et son code source sont la propriété intellectuelle de ses développeurs.
        </span>
        <br />
            Il est cependant possible de consulter/copier pour des usages non-commerciaux.
      </p>
      <div className="flex">
        <Button
          customStyle="empty"
          href="https://github.com/Cinevoraces/cinevoraces">
              Consulter Repos GitHub du projet
        </Button>
      </div>
      <p><span className='emphasis'>Vous souhaitez prendre part au projet ?</span>{' N\'hésitez à nous rejoindre sur Discord, suivre le projet sur GitHub ou encore approcher un des membres de l\'équipe directement'}</p>
      <p>
        {'Le site Cinévoraces s\'appuie en partie sur l\''}
        <Link
          target="_blank"
          href="https://developers.themoviedb.org/3/getting-started/introduction"
          className="underline text-orange-primary">
              API TMDB
        </Link>
            . Les métadonnées des films sont récupérées grâce à ce service, avant leur inscription dans la base de
            données de Cinévoraces.
      </p>
    </section>
  );
};
export default Credits;
