import { useRef } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@store/store';
import { toggleBurgerMenu, toggleUserMenu, toggleConnectionModal, globals } from '@store/slices/global';
import { user } from '@store/slices/user';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Modal from '@components/Modal';
import Button from '@components/Input/Button';
import { ConnectionForm } from '@components/Forms';

export default function Header() {
  const { isBurgerMenuOpen, isUserMenuOpen, isConnectionModalOpen } = useAppSelector(globals);
  const { isConnected, id, role } = useAppSelector(user);
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

  const navLinks = [
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // à pimper
  ];
  isConnected && navLinks.push(['Proposer un film', '/proposition'],);
  
  const userMenuLinks = [
    ['Mon Profil', `/profil/${id}`],
  ];
  (role === 'admin') && userMenuLinks.push(['Administration', '/administration']);

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
          !isConnected 
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
}
