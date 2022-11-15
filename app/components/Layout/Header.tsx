import React, { useState, useRef } from 'react';
import Link from 'next/link';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Button from '@components/Input/Button';
import { TextInput, Toggle } from '@components/Input';
import Modal from '@components/Modal/Modal';

export default function Header() {
  const navLinks = [
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // à pimper
    ['Proposer un film', '/proposition'],
  ];

  // States for demo, to be replaced later
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);

  //Toggle menu display when clicking outside them
  const burgerMenuRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLElement>(null);
  const connexionModalRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(burgerMenuRef, 'burger', isBurgerMenuOpen, setIsBurgerMenuOpen);
  useCloseMenuOnOutsideClick(userMenuRef, 'user', isUserMenuOpen, setIsUserMenuOpen);
  useCloseMenuOnOutsideClick(connexionModalRef, 'modal', isConnectionModalOpen, setIsConnectionModalOpen);

  return (
    <>
      <header
        className="lg:container max-w-8xl lg:mx-auto relative 
        py-2 px-2 flex items-center justify-between">
        <div className="flex gap-2">
          <HeaderMenu
            type="burger"
            stateValue={isBurgerMenuOpen}
            setter={setIsBurgerMenuOpen}
            links={navLinks}
            ref={burgerMenuRef}
          />
          <CompleteLogo />
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
        <Button onClick={() => setIsConnectionModalOpen(!isConnectionModalOpen)}>Connexion</Button>
      </header>
      {isConnectionModalOpen && (
        <Modal
          stateValue={isConnectionModalOpen}
          setter={setIsConnectionModalOpen}
          ref={connexionModalRef}>
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              !isRequired && setIsRequired(true);
            }}
            className="flex flex-col w-full gap-3">
            <TextInput
              id="identifier"
              label="Mail ou nom d'utilisateur"
              placeholder="Votre identifiant..."
              required={isRequired}
              minLength={3}
              errorMessage="Saisissez un identifiant"
            />
            <TextInput
              type={!isPwVisible ? 'password' : undefined}
              id="password"
              label="Entrez votre mot de passe"
              placeholder="Mot de passe..."
              required={isRequired}
              errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
            />
            <Toggle
              id="showPassword"
              label="Montrer le mot de passe ?"
              checked={isPwVisible}
              onChange={() => setIsPwVisible(!isPwVisible)}
            />
            <div className='flex justify-between'>
              <Button>Se connecter</Button>
              <Button customStyle='empty' to={'/inscription'} onClick={() => setIsConnectionModalOpen(!isConnectionModalOpen)}>{'S\'inscrire'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
