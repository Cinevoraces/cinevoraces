import React, { useRef } from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@store/store';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleIsPWVisible, inscription } from '@store/slices/inscription';
import Button from '@components/Input/Button';
import SendLogo from '@public/icons/send-icon.svg';
import { postRequestCSR } from '@utils/fetchApi';

export default function InscriptionForm() {
  const isPWVisible = useAppSelector(inscription).isPWVisible;
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const PWRef = useRef<HTMLInputElement>(null);
  const confirmPWRef = useRef<HTMLInputElement>(null);
  const allInputsRef = [emailRef, usernameRef, PWRef, confirmPWRef];

  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

  return (
    <form
      action="submit"
      onSubmit={ async (e) => {
        e.preventDefault();
        // Passing all inputs as required
        allInputsRef.forEach((inputRef) => {
          if (inputRef.current) inputRef.current.required = true;
        });
        // Checking PW correspondance
        const arePWCorresponding = PWRef.current?.value === confirmPWRef.current?.value;
        if (!arePWCorresponding) {
          confirmPWRef.current?.setCustomValidity('Les deux saisies ne correspondent pas.');
          return;
        }
        // Checking all inputs validation status
        const inputValidationStatus = allInputsRef.map((inputRef) => inputRef.current?.reportValidity());
        if (!inputValidationStatus.includes(false)) {
          const data = {
            password: PWRef.current!.value,
            mail: emailRef.current!.value,
            pseudo: usernameRef.current!.value,
          };
          const responseData = await postRequestCSR('/register', data);
          // Send a confirmation toast -> To do later          console.log(responseData.message);
        }
      }}
      className="flex flex-col w-full gap-6">
      <TextInputRef
        type="email"
        id="email"
        label="Email"
        placeholder="Votre email..."
        errorMessage="Saisissez une addresse mail."
        ref={emailRef}
      />
      <p className={helpingTextStyle}>{'Votre email sera utilisé pour la récupération de votre mot de passe.'}</p>
      <TextInputRef
        id="username"
        label="Nom d'utilisateur"
        placeholder="Votre nom d'utilisateur..."
        minLength={3}
        errorMessage="Saisissez un nom d'utilisateur de plus de 3 lettres."
        ref={usernameRef}
      />
      <p className={helpingTextStyle}>{'Doit comporter au moins 3 caractères, espaces autorisés.'}</p>
      <div className="flex flex-col gap-3">
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Entrez votre mot de passe"
          placeholder="Mot de passe..."
          pattern="^(?=.*[A-Za-z])(?=.*\d)[!#$&%*+=?|\-A-Za-z\d]{8,}$"
          errorMessage="La saisie ne réponds aux exigences de sécurité."
          ref={PWRef}
        />
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          placeholder="Confirmer votre mot de passe..."
          pattern="^(?=.*[A-Za-z])(?=.*\d)[!#$&%*+=?|\-A-Za-z\d]{8,}$"
          errorMessage="La saisie ne réponds aux exigences de sécurité."
          ref={confirmPWRef}
        />
        <Toggle
          id="showPassword"
          label="Montrer le mot de passe ?"
          checked={isPWVisible || false}
          onChange={() => dispatch(toggleIsPWVisible())}
        />
        <p className={helpingTextStyle}>
          {
            'Doit comporter au moins 12 caractères, dont a minima une majuscule, une minuscule, un symbole et un chiffre.'
          }
        </p>
      </div>
      <div className="flex justify-end">
        <Button customStyle="rounded">
          <Image
            src={SendLogo}
            alt=""
            width={16}
            height={16}
          />
          Envoyer
        </Button>
      </div>
    </form>
  );
}
