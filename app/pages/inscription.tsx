import React, { useState } from 'react';
import Image from 'next/image';
import { Form, Button, TextInput, Toggle } from '@components/Input';
import SendLogo from '@public/icons/send-icon.svg';
import PosterComponent from '@components/PosterComponents';
interface FormProps {
  children: React.ReactNode;
}

export default function Inscription() {
  const [isRequired, setIsRequired] = useState(false);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';
  return (
    <div className='w-full flex flex-col items-center md:flex-row-reverse'>
      <section className='w-full mt-8 mb-16 px-auto md:max-w-1/2 xl:mr-[10vh]'>
        <h1 className="text-3xl mb-10 font-bold">Créer un compte</h1>
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            !isRequired && setIsRequired(true);
          }}
          className="flex flex-col w-full gap-6">
          <TextInput
            id="email"
            label="Email"
            placeholder="Votre email..."
            required={isRequired}
            errorMessage="Saisissez une addresse mail."
          />
          <p className={helpingTextStyle}>{'Votre email sera utilisé pour la récupération de votre mot de passe.'}</p>
          <TextInput
            id="username"
            label="Nom d'utilisateur"
            placeholder="Votre nom d'utilisateur..."
            required={isRequired}
            errorMessage="Saisissez un nom d'utilisateur de plus de 3 lettres."
          />
          <p className={helpingTextStyle}>{'Doit comporter au moins 3 caractères, espaces autorisés.'}</p>
          <div className='flex flex-col gap-3'>
            <TextInput
              type={!isPwVisible ? 'password' : undefined}
              id="password"
              label="Entrez votre mot de passe"
              placeholder="Mot de passe..."
              required={isRequired}
              errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
            />
            <TextInput
              type={!isPwVisible ? 'password' : undefined}
              id="password"
              placeholder="Confirmer votre mot de passe..."
              required={isRequired}
              errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
            />
            <Toggle
              id="showPassword"
              label="Montrer le mot de passe ?"
              checked={isPwVisible}
              onChange={() => setIsPwVisible(!isPwVisible)}
            />
            <p className={helpingTextStyle}>{'Doit comporter au moins 12 caractères, dont a minima une majuscule, une minuscule, un symbole et un chiffre.'}</p>
          </div>
          <div className='flex justify-end'>
            <Button customStyle='rounded'>
              <Image src={SendLogo} alt="" width={16} height={16}/>
            Envoyer
            </Button>
          </div>
        </form>
      </section>
      <section className='w-full flex justify-center md:max-w-1/2 md:justify-start xl:ml-[10vh]'>
        <PosterComponent number={3} />
      </section>
    </div>
  );
}
