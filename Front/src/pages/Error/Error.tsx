import { useLocation } from 'react-router-dom';
import { ReactComponent as SVGError } from './Error.error_ico.svg';
import { Button } from 'components/Inputs/InputsLib';
import LastMoviesGrid from 'components/LastMoviesGrid/LastMoviesGrid';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import Footer from 'components/Layout/Footer';
import styles from './Error.module.scss';

type ErrorProps = {
  error?: any,
  children?: React.ReactNode
};

/**
 * @returns Error Page
 * @param error       Error log, used for error code.
 * @param children    Use this to customize error message.
 */
function Error({error, children}: ErrorProps) {
  const {pathname} = useLocation();
  const errorStatus = `Erreur ${error ? error.status : 404}`;

  return(
    <AnimationLayout>
      <main className={styles.error}>
        <h1><SVGError/>{errorStatus}</h1>
        <div className={styles.content}>
          {!error &&
            <p>
              L&apos;URL <span>{pathname}</span> n&apos;a rien donné.
              <br/> Essayez d'ouvrir les yeux en tapant votre requête.
            </p>}
          {(error && !children) &&
            <p>
              Vous avez forcement fait un truc de travers, on en serait pas là sinon...
            </p>}
          {(error && children) && children}
        </div>
        <Button to='/'>Retourner à l'accueil</Button>
      </main>
      <div className={styles['last-movies']}>
        <LastMoviesGrid/>
      </div>
      <Footer/>
    </AnimationLayout>
  );
}

export default Error;