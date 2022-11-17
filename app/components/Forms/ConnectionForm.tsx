import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@store/store';
import Button from '@components/Input/Button';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleConnectionModal } from '@store/slices/global';
import { toggleIsRequired, toggleIsPWVisible, connection } from '@store/slices/connection';

export default function ConnectionForm() {
  const { isRequired, isPWVisible } = useAppSelector(connection);
  const dispatch = useAppDispatch();

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        if (identifierRef.current && passwordRef.current) {
          !isRequired && dispatch(toggleIsRequired());
        }
      }}
      className="flex flex-col w-full gap-3">
      <TextInputRef
        id="identifier"
        label="Email ou nom d'utilisateur"
        placeholder="Votre identifiant..."
        required={isRequired}
        minLength={3}
        errorMessage="Saisissez un identifiant"
        ref={identifierRef}
      />
      <TextInputRef
        type={!isPWVisible ? 'password' : undefined}
        id="password"
        label="Entrez votre mot de passe"
        placeholder="Mot de passe..."
        required={isRequired}
        errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
        ref={passwordRef}
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
  );
};
