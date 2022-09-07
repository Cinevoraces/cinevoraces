import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetLastMovieQuery } from 'redux/api';
import styles from './MenuMobile.module.scss';

/**
 * @returns Mobile menu
 */
function MenuMobile() {
  const {data: lastMovieData} = useGetLastMovieQuery();
  const [lastMoviePath, setLastMoviePath] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    lastMovieData && setLastMoviePath(`film/${lastMovieData.id}`);
  }, [lastMovieData]);

  return (
    <>
      <button onClick={handleMobileMenu} className={styles['nav-mobile']}>
        <img src='/images/mobile_menu.svg' alt='' />
      </button>
      {mobileMenu &&
      <nav className={styles.nav}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to='/' onClick={handleMobileMenu}>
              Accueil
            </Link>
          </li>
          <li className={styles.link}>
            <Link to='/films' onClick={handleMobileMenu}>
              Les films
            </Link>
          </li>
          <li className={styles.link}>
            <Link to={lastMoviePath} className={styles.link}>
              Le dernier film
            </Link>
          </li>
        </ul>
      </nav>}
    </>
  );
}

export default MenuMobile;