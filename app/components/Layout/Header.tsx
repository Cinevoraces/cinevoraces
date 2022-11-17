import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@store/store';

import {
  toggleBurgerMenu,
  toggleUserMenu,
  toggleConnectionModal,
  globals,
} from '@store/slices/global';
import {
  toggleIsRequired,
  toggleIsPWVisible,
  connection,
} from '@store/slices/connection';

import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Modal from '@components/Modal/Modal';
import Button from '@components/Input/Button';
import { Form, TextInput, Toggle } from '@components/Input';

export default function Header() {
  const navLinks = [
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // à pimper
    ['Proposer un film', '/proposition'],
  ];

  const {
    isBurgerMenuOpen,
    isUserMenuOpen,
    isConnectionModalOpen,
  } = useAppSelector(globals);
  const {
    isRequired,
    isPWVisible,
  } = useAppSelector(connection);
  const dispatch = useAppDispatch();

  //Toggle menu display when clicking outside them
  const burgerMenuRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLElement>(null);
  const connexionModalRef = useRef<HTMLElement>(null);

  useCloseMenuOnOutsideClick(burgerMenuRef, 'burger', isBurgerMenuOpen, () => dispatch(toggleBurgerMenu()));
  useCloseMenuOnOutsideClick(userMenuRef, 'user', isUserMenuOpen, () => dispatch(toggleUserMenu()));
  useCloseMenuOnOutsideClick(connexionModalRef, 'modal', isConnectionModalOpen, () => dispatch(toggleConnectionModal()));

  return (
    <>
      <header
        className="lg:container max-w-8xl lg:mx-auto relative 
        py-2 px-2 flex items-center justify-between">
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
        <Button onClick={() => dispatch(toggleConnectionModal())}>Connexion</Button>
      </header>
      {isConnectionModalOpen && (
        <Modal
          stateValue={isConnectionModalOpen}
          setter={() => dispatch(toggleConnectionModal())}
          ref={connexionModalRef}>
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              !isRequired && dispatch(toggleIsRequired());
            }}
            className="flex flex-col w-full gap-3">
            <TextInput
              id="identifier"
              label="Email ou nom d'utilisateur"
              placeholder="Votre identifiant..."
              required={isRequired}
              minLength={3}
              errorMessage="Saisissez un identifiant"
            />
            <TextInput
              type={!isPWVisible ? 'password' : undefined}
              id="password"
              label="Entrez votre mot de passe"
              placeholder="Mot de passe..."
              required={isRequired}
              errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
            />
            <Toggle
              id="showPassword"
              label="Montrer le mot de passe ?"
              checked={isPWVisible}
              onChange={() => dispatch(toggleIsPWVisible())}
            />
            <div className="mt-4 flex flex-col justify-center gap-6 sm:flex-row">
              <Button>Se connecter</Button>
              <Button
                customStyle="empty"
                onClick={() => dispatch(toggleConnectionModal())}
                to={'/inscription'}>
                {'S\'inscrire'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
