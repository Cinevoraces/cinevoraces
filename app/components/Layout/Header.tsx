import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@store/store';
import { toggleBurgerMenu, toggleUserMenu, toggleConnectionModal, global } from '@store/slices/global';
import { user } from '@store/slices/user';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Modal from '@components/Modal';
import Button from '@components/Input/Button';
import { ConnectionForm } from '@components/Forms';
import useSWR from 'swr';
import { Roles } from 'models/enums';
import useUpdateNavigationLinks from '@hooks/useUpdateNavigationLinks';
import useRecoverStateFromSessionStorage from '@hooks/useRecoverStateFromSessionStorage';
import type { CompleteMovie } from 'models/custom_types/movies';
import type { User } from 'models/custom_types/index';

/**
 * 
 * @returns adaptive header with dynamic parts such as navigation /user menus and dynamic links
 */
const Header = () => {
  const { isBurgerMenuOpen, isUserMenuOpen, isConnectionModalOpen } = useAppSelector(global);
  const { id, role } = useAppSelector(user);
  const dispatch = useAppDispatch();

  const [navLinks, setNavLinks] = useState([
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // Mandatory to avoid the apparition of the link after data fetching
  ]);

  const { data: lastMovie } = useSWR<CompleteMovie[]>('/movies?where[is_published]=true&limit=1');
  const { data: usersData } = useSWR<User[]>(() => (id ? `/users?select[propositions]=true&where[id]=${id}` : null));
  useUpdateNavigationLinks(lastMovie, setNavLinks, navLinks, id, usersData);
  
  const userMenuLinks = [
    ['Mon Profil', '/membres/moi'],
  ];
  (role === Roles.ADMIN) && userMenuLinks.push(['Administration', '/administration']);

  // Due to lifecycle and store operations, keeping state operations have to be executed here :
  useRecoverStateFromSessionStorage();

  return (
    <>
      <header
        className="py-2 px-2 flex items-center justify-between
        lg:container max-w-8xl lg:mx-auto relative">
        <div className="flex gap-2 md:gap-6">
          <HeaderMenu
            type="burger"
            stateValue={isBurgerMenuOpen}
            setter={() => dispatch(toggleBurgerMenu())}
            links={navLinks}
          />
          <Link
            href={'/'}
            aria-label="Return to homepage on logo click">
            <CompleteLogo />
          </Link>
        </div>
        <nav className="hidden justify-between lg:flex">
          {navLinks.map((link, i) => (
            <Link
              tabIndex={i}
              href={link[1]}
              key={link[0]}
              className="hover:text-orange-primary 
              after:inline-block after:w-2 after:h-2 after:rounded-full after:bg-orange-primary after:mx-4 after:my-[1px]
              last:after:hidden">
              {link[0]}
            </Link>
          ))}
        </nav>
        {
          !id 
            ? <Button onClick={() => dispatch(toggleConnectionModal())}>Connexion</Button>
            : <HeaderMenu
              type="user"
              stateValue={isUserMenuOpen}
              setter={() => dispatch(toggleUserMenu())}
              links={userMenuLinks} />
        }
      </header>
      {isConnectionModalOpen && (
        <Modal
          stateValue={isConnectionModalOpen}
          setter={() => dispatch(toggleConnectionModal())}
        >
          <ConnectionForm />
        </Modal>
      )}
    </>
  );
};

export default Header;
