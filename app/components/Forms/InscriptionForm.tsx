import React, { useRef } from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@store/store';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleIsRequired, toggleIsPWVisible, inscription } from '@store/slices/inscription';
import Button from '@components/Input/Button';
import SendLogo from '@public/icons/send-icon.svg';

export default function InscriptionForm() {
  const { isRequired, isPWVisible } = useAppSelector(inscription);
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const PWRef = useRef<HTMLInputElement>(null);
  const confirmPWRef = useRef<HTMLInputElement>(null);

  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        !isRequired && dispatch(toggleIsRequired());
      }}
      className="flex flex-col w-full gap-6">
      <TextInputRef
        id="email"
        label="Email"
        placeholder="Votre email..."
        required={isRequired}
        errorMessage="Saisissez une addresse mail."
        ref={emailRef}
      />
      <p className={helpingTextStyle}>{'Votre email sera utilisé pour la récupération de votre mot de passe.'}</p>
      <TextInputRef
        id="username"
        label="Nom d'utilisateur"
        placeholder="Votre nom d'utilisateur..."
        required={isRequired}
        errorMessage="Saisissez un nom d'utilisateur de plus de 3 lettres."
        ref={usernameRef}
      />
      <p className={helpingTextStyle}>{'Doit comporter au moins 3 caractères, espaces autorisés.'}</p>
      <div className='flex flex-col gap-3'>
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Entrez votre mot de passe"
          placeholder="Mot de passe..."
          required={isRequired}
          errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
          ref={PWRef}
        />
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          placeholder="Confirmer votre mot de passe..."
          required={isRequired}
          errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
          ref={confirmPWRef}
        />
        <Toggle
          id="showPassword"
          label="Montrer le mot de passe ?"
          checked={isPWVisible}
          onChange={() => dispatch(toggleIsPWVisible())}
        />
        <p className={helpingTextStyle}>{'Doit comporter au moins 12 caractères, dont a minima une majuscule, une minuscule, un symbole et un chiffre.'}</p>
      </div>
      <div className='flex justify-end'>
        <Button customStyle='rounded'>
          <Image src={SendLogo} alt="" width={16} height={16}/>
      Envoyer
        </Button>
      </div>
    </form>);
}
