import { ReactComponent as SVGDiscord } from './Home.discord.svg';
import { useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { Button } from 'components/Inputs/InputsLib';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import Metrics from 'components/Metrics/Metrics';
import Footer from 'components/Layout/Footer';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import styles from './Home.module.scss';

function Home() {
  return (
    <AnimationLayout>
      <Hero />
      <LastMoviesGrid />
      <About/>
      <Discord/>
      <Share/>
      <Metrics/>
      <Footer/>
    </AnimationLayout>
  );
};

const discordLink = 'https://discord.gg/r6tK5PGyE7';

function Hero() {
  const {isOnline} = useAppSelector(userState);
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <h1>
          <span>Bienvenue</span> dans votre <span>ciné-club</span> virtuel !
        </h1>
        <p>Chaque semaine, un film à découvrir</p>
        <div className={styles.buttons}>
          <Button to='/films' styleMod='fill'>Découvrir un film</Button>
          {!isOnline && <Button to='/register'>S'inscrire</Button>}
        </div>
      </div>
      <div className={styles['img-wrapper']}>
        <img src='/images/hero-img.jpg' alt='Affiche de films' />
      </div>
    </section>
  );
}

function About() {
  const {isOnline} = useAppSelector(userState);
  const title = 'Chaque semaine, une découverte !';
  return (
    <section className={styles.about}>
      <div className={styles.wrapper}>
        <h2 className={styles['mobile-title']}>{title}</h2>
        <div className={styles.content}>
          <img src='/images/week-movie.png' alt=''/>
          <div className={styles.text}>
            <h2 className={styles['tablet-title']}>{title}</h2>
            <p>
              <em>CinéVoraces</em> rassemble depuis 2020 les passionnés du grand écran au sens large. Comédies, blockbusters,
              drames, thrillers, films d’auteurs... tous les genres y sont représentés ! Sur le même principe qu’un 
              club de lecture, chaque semaine, un membre de la communauté propose une oeuvre à visionner. 
              Il est ensuite possible de débatre et discuter du film sur <a href={discordLink} rel='noreferrer' target='_blank'>notre serveur discord</a>, ou bien directement sur le site dans l’espace commentaire.
            </p>
            {!isOnline &&
            <>
              <p>
                <br/>
                Envie de rejoindre l'aventure? <em>Inscrivez-vous</em> pour échanger entre cinéphiles et partager vos films préférés.
              </p>
              <Button styleMod='fill-rounded' to='/register'>S'inscrire</Button>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Discord() {
  const title = 'Rejoignez le serveur Discord';

  return (
    <section className={styles.discord}>
      <h2 className={styles['mobile-title']}>{title}</h2>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles['tablet-title']}>{title}</h2>
          <div className={styles.text}>
            <p>
              Vous souhaitez pouvoir échanger avec le reste de la communauté de manière interactive ?
              Participer aux lives hebdomadaires pour échanger de vive vois sur les films proposés ?
            </p>
            <p>
              Nous sommes de plus en plus nombreux à partager sur cette plateforme. N’hésitez pas à nous rejoindre !
            </p>
          </div>
          <Button styleMod='fill-rounded' href={discordLink}>Rejoindre le serveur</Button>
        </div>
        <SVGDiscord/>
      </div>
    </section>
  );
}

function Share() {
  return (
    <section className={styles.share}>
      <div className={styles.wrapper}>
        <img src='/images/dec.jpg' alt=''/>
        <div>
          <h2>Partagez votre dernière découverte</h2>
          <p>
            CinéVoraces est avant tout un site <em>communautaire</em>,
            rejoignez la communauté et <em>intéragissez</em> avec les films.
            On veut savoir ce que vous en avez pensé!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home; 