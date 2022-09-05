import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout, userState } from 'redux/slices/user';
import { Link } from 'react-router-dom';
import styles from './UserMenu.module.scss';

type MenuProps = {
  setter(): void,
}

/**
 * @returns User menu
 */
function UserMenu() {
  const {avatar} = useAppSelector(userState);
  const [menuState, setMenuState] = useState(false);
  const handleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <>
      {menuState && <Menu setter={handleMenu}/>}
      <img 
        onClick={handleMenu}
        className={styles.ico}
        src={`${(avatar) ? avatar : '/images/user_default.svg'}`}
        alt=''
      />
    </>
  );
}

function Menu({setter}: MenuProps) {
  const {pseudo, id, role} = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className={styles['background']} onClick={setter}/>
      <nav className={styles.nav}>
        <span className={styles.username}>{pseudo}</span>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link to={`/user/${id}`} onClick={setter}>
              Mon Profil
            </Link>
          </li>
          <li className={styles.link}>
            <Link reloadDocument to='/proposal' onClick={setter}>
              Proposer un film
            </Link>
          </li>
          {(role === 'admin') &&
            <li className={styles.link}>
              <Link reloadDocument to='/admin' onClick={setter}>
                Dashboard Admin
              </Link>
            </li>}
          <li className={styles.link}>
            <Link onClick={logoutHandler} to='/'>
              Se déconnecter
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UserMenu;