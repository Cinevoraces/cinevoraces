import React, { useState } from 'react';
import Link from 'next/link';
import BurgerMenuIcon from '../Input/BurgerMenuIcon';
import CompleteLogo from './CompleteLogo';
import Button from '@components/Input/Button';

export default function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navLinks = [
    ['Accueil', '/'],
    ['Les films', '/films'],
    ['Le film de la semaine', '/films/1'], // à pimper
    ['Proposer un film', '/proposition'],
  ];

  return (
    <header>
      <BurgerMenuIcon stateValue={isBurgerOpen} setter={setIsBurgerOpen} />
      <CompleteLogo />
      <nav>
        {navLinks.map((link) => (
          <Link
            href={link[1]}
            key={link[0]}>
            {link[0]}
          </Link>
        ))}
      </nav>
      <Button>Connexion</Button>
    </header>
  );
}
