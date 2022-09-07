import { ReactComponent as SVGLogo } from './Layout.Logo.svg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2,
  delay: 0.5
}; 
const variants = {
  hidden: {opacity: 0, transition},
  show:   {opacity: 1, transition},
};

/**
 * @returns App Footer 
 */
function Footer() {
  return(
    <motion.div className={styles.footer} variants={variants} initial='hidden' animate='show'>
      <footer className={styles.footer}>
        <SVGLogo/>
        <div className={styles.links}>
          <Link to='/team' className={styles.link}>À propos de CinéVoraces</Link>
        </div>
        <div className={styles.copyright}>© Tout droit réservé - 2022</div>
      </footer>
    </motion.div>
  );
}

export default Footer;