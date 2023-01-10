const Origin = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="title-section mb-4">{'L\'origine du projet :'}</h2>
      <p>
        Cinévoraces est d’abord un petit <span className="emphasis">ciné-club distantiel </span> monté sur Discord par{' '}
        <span className="emphasis">Julien</span>
        {
          ' en 2020. Le principe : tous les lundis, une personne propose le visionnage d\'un film aux autres. Tout le monde le regarde, en parle, et une fois par mois un debrief collectif est organisé en vocal.'
        }
        <br />
        {'En 2020, il rêve déjà de rendre l\'aventure plus accessible et inclusive.'}
      </p>
      <p>
        C’est au cours de sa <span className="emphasis">formation de développeur</span>{' qu\'il décide de sauter le pas.'}
        <br />
        {'Le marathon qu\'il envisageait solitaire se transforme en'}
        <span className="emphasis">{' projet collectif.'}</span>
        {' C\'est ainsi que voit le jour une première version de Cinévoraces, grâce à '}
        <span className="emphasis">Benoît, Anthony, Joffrey et Gino</span>.<br />
        {'De cette première version "académique", il ne reste aujourd\'hui presque plus rien.'}
        <br />
        {'Cinévoraces 1.0 n\'est plus, vive Cinévoraces 2.0 ! Et ce n\'est que le début de l\'aventure...'}
      </p>
    </section>
  );
};
export default Origin;
