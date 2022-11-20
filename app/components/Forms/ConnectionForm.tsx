import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@store/store';
import Button from '@components/Input/Button';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleConnectionModal } from '@store/slices/global';
import { toggleIsPWVisible, connection } from '@store/slices/connection';
import { postRequestCSR } from '@utils/fetchApi';
import { login } from '@store/slices/user';
import { toast } from 'react-hot-toast';

export default function ConnectionForm() {
  const isPWVisible = useAppSelector(connection).isPWVisible;
  const dispatch = useAppDispatch();

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const allInputsRef = [identifierRef, passwordRef];

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>, allInputsRef: React.RefObject<HTMLInputElement>[]) => {
    e.preventDefault();
    // Passing all inputs as required
    allInputsRef.forEach((inputRef) => {
      if (inputRef.current) inputRef.current.required = true;
    });
    // Checking all inputs validation status
    const inputValidationStatus = allInputsRef.map((inputRef) => inputRef.current?.reportValidity());
    if (!inputValidationStatus.includes(false)) {
      const data = {
        password: passwordRef.current!.value,
        pseudo: identifierRef.current!.value,
      };
      const responseData = await postRequestCSR('/login', data);
      // Send a confirmation toast -> To do later
      console.log(responseData.response);
      toast.success(responseData.response);
      // State Mutation
      dispatch(login(responseData.user));
      // Save the accessToken in the localStorage
      window.localStorage.setItem('accessToken', responseData.token);
      // Closing modal
      dispatch(toggleConnectionModal());
    };
  };

  return (
    <form
      action="submit"
      onSubmit={ async (e) => handleSubmit(e, allInputsRef)}
      className="flex flex-col w-full gap-3">
      <TextInputRef
        id="identifier"
        label="Email ou nom d'utilisateur"
        placeholder="Votre identifiant..."
        minLength={3}
        errorMessage="Saisissez un identifiant"
        ref={identifierRef}
      />
      <TextInputRef
        type={!isPWVisible ? 'password' : undefined}
        id="password"
        label="Entrez votre mot de passe"
        placeholder="Mot de passe..."
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
