import { ReactComponent as SVGLinkedIn } from './About.ico_linkedin.svg';
import { ReactComponent as SVGGit } from './About.ico_git.svg';
import { ReactComponent as SVGWeb } from './About.ico_web.svg';
import { Button } from 'components/Inputs/InputsLib';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import Footer from 'components/Layout/Footer';
import Avatar from 'components/Avatar/Avatar';
import styles from './About.module.scss';

type ListProps = {
  children: React.ReactNode
}
type LiProps = {
  imgSrc: string,
  name: string,
  pseudo?: string,
  roles: string[],
  links: {svg: JSX.Element, link: string}[],
  contributions: string[]
}

function About() {
  const owners = [
    {
      name: 'Julien GOLETTO',
      imgSrc: '/images/contributor_1.png',
      roles: ['Propriétaire', 'Dev front & back'],
      links: [
        {svg: <SVGLinkedIn/>, link:'https://www.linkedin.com/in/julien-goletto-a589a2203/'}
      ],
      contributions: ['RefreshToken de ses morts', 'Casser le back']
    },
    {
      name: 'Benoit Safari', 
      pseudo: 'Gregory MICHALAK',
      imgSrc: '/images/contributor_2.png',
      roles: ['Dev front'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/gregory-michalak/'},
        {svg: <SVGGit/>, link: 'https://github.com/BenoitSafari'},
        {svg: <SVGWeb/>, link: 'https://benoitsafari.com'}
      ],
      contributions: ['Management dépôt git front', 'Integration', 'Fonctionnalités Front']
    },
    {
      name: 'Anthony ESPIRAT',
      imgSrc: '/images/contributor_3.png',
      roles: ['Dev front', 'Designer'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/anthony-espirat/'},
        {svg: <SVGGit/>, link: 'https://github.com/anthonyespirat'},
        {svg: <SVGWeb/>, link: 'https://e-anthony.fr/'}
      ],
      contributions: ['Design du site', 'Integration', 'Fonctionnalités Front']
    },
    {
      name: 'Joffrey D\'ORTOLI',
      imgSrc: '/images/contributor_4.jpg',
      roles: ['Dev back'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/joffreydortoli/'},
      ],
      contributions: ['Dénichage de pathé', 'Previens de l\'heure de l\'apero']

    },
    {
      name: 'Gino SALOME',
      imgSrc: '/images/contributor_5.jpg',
      roles: ['Dev front'],
      links: [
        {svg: <SVGLinkedIn/>, link: 'https://www.linkedin.com/in/gino-salom%C3%A9-0a10ba139/'},
      ],
      contributions: ['Integration', 'Fonctionnalités Front']
    }
  ];
  const contributors = [
    {
      name: 'Disco Blitzkrieg',
      imgSrc: '/images/contributor_6.jpg',
      roles: ['Graphiste'],
      links: [],
      contributions: ['Icône page d\'erreur']
    },
    {
      name: 'Camille MICHALAK',
      imgSrc: '/images/contributor_7.jpg',
      roles: ['Chargée de Marketing & Communication'],
      links: [{svg:<SVGLinkedIn/>, link: 'https://www.linkedin.com/in/camille-michalak-a2600982/'}],
      contributions: ['Rédaction Web', 'Conseils SEO & Communication']
    },
  ];

  return (
    <AnimationLayout>
      <main className={styles.about}>
        <div className={styles.presentation}>
          <h1>À propos de CinéVoraces</h1>
          <div className={styles.intro}>
            <div>‟<span>Chéri.e, qu'est-ce qu'on mate ce soir ?</span> ”</div>
            <div>‟<span>Attends je regarde notre liste de films sur Netflix</span> ”</div>
            <div>5 minutes plus tard ‟<span>T'as trouvé ?</span> ”</div>
            <div>‟<span>Non, attends</span> ”</div>
            <div>1h plus tard ‟<span>Bon sang c'est déjà 22h30, roh la flemme</span> ”</div>
          </div>
          <p>
            Cinévoraces c'est d’abord un petit <em>ciné-club distantiel</em> monté par <em>Julien GOLETTO</em> en 
            début de pandémie avec des copains. Le principe : tous les lundis, un membre peut, s'il le souhaite,
            proposer le visionnage d'un film pendant une semaine. On le regarde, on échange par écrit, et une fois par mois
            un debrief d'une heure est organisé pour en discuter de vive voix, et tout se passe sur Discord.
          </p>
          <p>
            C’est lors de sa formation à <a href='https://oclock.io/' target='_blank' rel='noreferrer'>l’école O’Clock</a> que Julien
            a l’idée de faire grandir CinéVoraces à l’aide de ses compétences en développement web.
            Il décide d’orienter son projet de fin de formation vers la création d’une application avec ses 
            collègues <em>Grégory, Anthony, Joffrey et Gino</em>. C’est comme ça qu’est né <em>CinéVoraces 2.0</em>, et ce n’est que le commencement!
          </p>
          <p>
            De nombreux contributeurs nous ont déjà rejoint. <em>Peut-être serez-vous le prochain ?</em>
          </p>
          <p>
            CinéVoraces et son code source sont la propriété intellectuelle de ses créateurs,
            il est cependant possible de consulter/copier le code source <em>tant qu'il 
            ne s'agit pas d'un usage commercial</em>.
          </p>
          <div className={styles.links}>
            <Button href={'https://github.com/Julien-Goletto/cinevoraces-front'}>Consulter le dépôt GitHub Front</Button>
            <Button href={'https://github.com/Julien-Goletto/cinevoraces-back'}>Consulter le dépôt GitHub Back</Button>
          </div>
        </div>
        <h2>Les contributeurs</h2>
        <h3>À l'origine du projet</h3>
        <List>
          {owners.map((owner, index) => (
            <ListElement key={index} {...owner}/>))}
        </List>
        <h3>Nous ont rejoint</h3>
        <List>
          {contributors.map((contributor, index) => (
            <ListElement key={index} {...contributor}/>))}
        </List>
      </main>
      <Footer/>
    </AnimationLayout>
  );
};

function List({children}: ListProps) {
  return(
    <ul className={styles.contributors}>
      {children}
    </ul>
  );
}

function ListElement(props: LiProps) {
  const {imgSrc, name, pseudo, roles, links, contributions} = props;
  return(
    <li className={styles.card}>
      <div className={styles.row}>
        <div className={styles.col}>
          <strong><em>{name}</em></strong>
          {pseudo && 
            <span className={styles.pseudo}>{pseudo}</span>}
          {roles.map((role, index) =>(
            <span key={index}>{role}</span>))}
          <div className={`${styles.row} ${styles['row--links']}`}>
            {links.map(({svg, link}, index) => (
              <a key={index} href={link} target={'_blank'} rel='noreferrer'>
                {svg}
              </a>
            ))}
          </div>
        </div>
        <Avatar img={imgSrc}/>
      </div>
      <strong>Contributions</strong>
      <div className={styles.col}>
        <ul className={styles.col}>
          {contributions.map((contribution, index) => (
            <li key={index}>{contribution}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default About;