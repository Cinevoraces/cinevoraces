import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@store/store';
import { toggleBurgerMenu, toggleUserMenu, toggleConnectionModal, global } from '@store/slices/global';
import { user } from '@store/slices/user';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Modal from '@components/Modal';
import Button from '@components/Input/Button';
import { ConnectionForm } from '@components/Forms';
import useSWR from 'swr';
import { Roles } from '@custom_types/global';

const Header = () => {
  const { isBurgerMenuOpen, isUserMenuOpen, isConnectionModalOpen } = useAppSelector(global);
  const { id, role } = useAppSelector(user);
  const dispatch = useAppDispatch();

  //Toggle menu display when clicking outside them
  const burgerMenuRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLElement>(null);
  const connexionModalRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(burgerMenuRef, 'burger', isBurgerMenuOpen, () => dispatch(toggleBurgerMenu()));
  useCloseMenuOnOutsideClick(userMenuRef, 'user', isUserMenuOpen, () => dispatch(toggleUserMenu()));
  useCloseMenuOnOutsideClick(connexionModalRef, 'modal', isConnectionModalOpen, () =>
    dispatch(toggleConnectionModal())
  );

  const [navLinks, setNavLinks] = useState([
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // Mandatory to avoid the apparition of the link after data fetching
  ]);

  const { data: lastMovie } = useSWR('/movies?where[is_published]=true&limit=1');
  const { data: usersData } = useSWR(() => (id ? `/users?select[propositions]=true&where[id]=${id}` : null));
  useEffect(() => {
    if (lastMovie && lastMovie.length > 0) {
      // First, remove all older/initial links
      setNavLinks([
        ...navLinks
          .filter((l) => (l[0] !== 'Le film de la semaine'))
          .filter((l) => (l[0] !== 'Proposer un film')), 
        ['Le film de la semaine', `/films/${lastMovie[0].id}`]
      ]);
    }
    // Adding proposition link for connected users that have no pending proposition
    if (id && usersData[0].propositions.length === 0) {
      console.log('modification des liens');
      console.log('usersData dans le header : ', usersData[0]);
      setNavLinks([...navLinks, ['Proposer un film', '/proposition']]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMovie, id, usersData]);
  
  const userMenuLinks = [
    ['Mon Profil', '/membres/moi'],
  ];
  (role === Roles.ADMIN) && userMenuLinks.push(['Administration', '/administration']);

  return (
    <>
      <header
        className="py-2 px-2 flex items-center justify-between
        lg:container max-w-8xl lg:mx-auto relative">
        <div className="flex gap-2">
          <HeaderMenu
            type="burger"
            stateValue={isBurgerMenuOpen}
            setter={() => dispatch(toggleBurgerMenu())}
            links={navLinks}
            ref={burgerMenuRef}
          />
          <Link
            href={'/'}
            aria-label="Return to homepage on logo click">
            <CompleteLogo />
          </Link>
        </div>
        <nav className="hidden justify-between lg:flex">
          {navLinks.map((link) => (
            <Link
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
              links={userMenuLinks}
              ref={userMenuRef}
            />
        }
      </header>
      {isConnectionModalOpen && (
        <Modal
          stateValue={isConnectionModalOpen}
          setter={() => dispatch(toggleConnectionModal())}
          ref={connexionModalRef}>
          <ConnectionForm />
        </Modal>
      )}
    </>
  );
};

export default Header;
