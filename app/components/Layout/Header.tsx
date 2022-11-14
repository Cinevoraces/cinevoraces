import React, { useState, useRef } from 'react';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Button from '@components/Input/Button';

const navLinks = [
  ['Accueil', '/'],
  ['Les films', '/films'],
  ['Le film de la semaine', '/films/1'], // à pimper
  ['Proposer un film', '/proposition'],
];

export default function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLElement>(null);
  // const burgerMenuRef = useRef() as React.Ref<HTMLElement>;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(burgerMenuRef, 'burger', isBurgerMenuOpen, setIsBurgerMenuOpen);
  useCloseMenuOnOutsideClick(userMenuRef, 'user', isUserMenuOpen, setIsUserMenuOpen);

  return (
    <header className="relative py-2 px-4 flex justify-between items-center">
      <HeaderMenu
        type="burger"
        stateValue={isBurgerMenuOpen}
        setter={setIsBurgerMenuOpen}
        links={navLinks}
        ref={burgerMenuRef}
      />
      <CompleteLogo />
      <Button>Connexion</Button>
    </header>
  );
}
