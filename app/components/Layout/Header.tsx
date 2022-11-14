import React, { useState, useRef } from 'react';
import Link from 'next/link';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import HeaderMenu from './HeaderMenu';
import CompleteLogo from './CompleteLogo';
import Button from '@components/Input/Button';

export default function Header() {
  const navLinks = [
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // à pimper
    ['Proposer un film', '/proposition'],
  ];
  const burgerMenuRef = useRef<HTMLElement>(null);
  const userMenuRef = useRef<HTMLElement>(null);
  // States for demo, to be replaced later
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  useCloseMenuOnOutsideClick(burgerMenuRef, 'burger', isBurgerMenuOpen, setIsBurgerMenuOpen);
  useCloseMenuOnOutsideClick(userMenuRef, 'user', isUserMenuOpen, setIsUserMenuOpen);

  return (
    <header className="lg:container max-w-8xl lg:mx-auto relative 
      py-2 px-2 flex items-center justify-between">
      <div className='flex gap-2'>
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
      <Button>Connexion</Button>
    </header>
  );
}
