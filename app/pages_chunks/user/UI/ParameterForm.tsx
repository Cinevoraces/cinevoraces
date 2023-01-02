import { useRef, useState } from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@store/store';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleArePWVisible, global } from '@store/slices/global';
import Button from '@components/Input/Button';
import SendLogo from '@public/icons/send-icon.svg';
import { mutationRequestCSR } from '@utils/fetchApi';
import { toast } from 'react-hot-toast';
import tryCatchWrapper from '@utils/tryCatchWrapper';
import type { BodyData } from '@utils/fetchApi';
import type { KeyedMutator } from 'swr';
import type { User } from '@custom_types/index';
import { File } from '@components/Input';

import { setUserModification } from '@store/slices/user';

interface ParameterFormInterface {
  mutate: KeyedMutator<User[]>
  mail: string;
}

const ParameterForm = ({ mutate, mail }: ParameterFormInterface) => {
  const isPWVisible = useAppSelector(global).arePWVisible;
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const PWRef = useRef<HTMLInputElement>(null);
  const newPWRef = useRef<HTMLInputElement>(null);
  const confirmNewPWRef = useRef<HTMLInputElement>(null);
  const allInputsRef = [emailRef, usernameRef, PWRef, newPWRef, confirmNewPWRef];

  const [arePWMatching, setArePWMatching] = useState(true);

  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

  const matchingErrorMessage = 'Les deux saisies ne correspondent pas.';

  const submitSuccess = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: BodyData) => {
    await mutationRequestCSR(method, endpoint, data);
    // Clean input values before sending
    allInputsRef.forEach((i) => {
      if (i.current) {
        i.current.value = '';
        i.current.required = false;
      }
    });
    const user = await mutate();
    if (user && user.length > 0) dispatch(setUserModification({ pseudo: user[0].pseudo }));
    toast.success('Vos changements ont bien été pris en compte.');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    allInputsRef: React.RefObject<HTMLInputElement>[]
  ) => {
    e.preventDefault();
    // Checking which inputs are used and current PW
    const modifiers = allInputsRef.filter((i) => i.current && (i.current.value || i === PWRef));
    // Passing all used input as required
    modifiers.forEach((i) => {
      if (i.current) i.current.required = true;
    });
    // Checking PW correspondance if password modification requested
    if (newPWRef.current && newPWRef.current.value){
      setArePWMatching((!newPWRef.current?.value && !confirmNewPWRef.current?.value) 
        ? true 
        : (newPWRef.current?.value === confirmNewPWRef.current?.value)
      );
      if (!arePWMatching) {
        confirmNewPWRef.current?.setCustomValidity(matchingErrorMessage);
        return;
      }
    }
    // Checking all inputs validation status
    const inputValidationStatus = allInputsRef.map((inputRef) => inputRef.current?.value && inputRef.current?.reportValidity());
    if (inputValidationStatus.length > 0 && !inputValidationStatus.includes(false)) {
      const update_user: {[key: string]: string } = {};
      if (modifiers.includes(emailRef) && emailRef.current) update_user['mail'] = emailRef.current.value;
      if (modifiers.includes(usernameRef) && usernameRef.current) update_user['pseudo'] = usernameRef.current.value;
      if (modifiers.includes(newPWRef) && newPWRef.current) update_user['password'] = newPWRef.current.value;
      const data = {
        password: PWRef.current!.value,
        update_user,
      };
      tryCatchWrapper(submitSuccess)('PUT', '/users', data);
    };
  };

  return (
    <form
      action="submit"
      onSubmit={async (e) => handleSubmit(e, allInputsRef)}
      className="flex flex-col w-full gap-6 max-w-lg">
      <File/>
      <div className='flex flex-col gap-1'>
        <TextInputRef
          type="email"
          id="email"
          label="Modifier votre email"
          placeholder="Votre nouvel email..."
          errorMessage="Saisissez une addresse mail."
          ref={emailRef}
        />
        <p className={helpingTextStyle}>Mon addresse actuelle : <span className='emphasis'>{mail}</span></p>
      </div>
      <TextInputRef
        id="username"
        label="Modifier mon nom d'utilisateur"
        placeholder="Votre nouveau nom d'utilisateur..."
        minLength={3}
        errorMessage="Saisissez un nom d'utilisateur de plus de 3 lettres."
        ref={usernameRef}
      />
      <p className={helpingTextStyle}>{'Doit comporter au moins 3 caractères, espaces autorisés.'}</p>
      <div className="flex flex-col gap-3">
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Modifier votre mot de passe"
          placeholder="Nouveau mot de passe..."
          ref={newPWRef}
        />
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          placeholder="Confirmez votre nouveau mot de passe..."
          pattern={process.env.NEXT_PUBLIC_PASS_REGEXP}
          errorMessage={!arePWMatching ? matchingErrorMessage : 'La saisie ne réponds pas aux exigences de sécurité.'}
          ref={confirmNewPWRef}
        />
        <p className={helpingTextStyle}>
          Longueur minimale : 12 caractères.<br/>
          Doit comprendre au moins une majuscule, une minuscule, un chiffre et un symbole parmi ! # $ % * + = ? | -
        </p>
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Confirmez les modifications avec votre mot de passe actuel"
          placeholder="Mot de passe actuel..."
          errorMessage={'Saisir votre mot de passe actuel pour confirmer.'}
          ref={PWRef}
        />
        <Toggle
          id="showPasswordInscription"
          name="showPasswordInscription"
          label="Montrer les mots de passe ?"
          checked={isPWVisible || false}
          onChange={() => dispatch(toggleArePWVisible())}
        />
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
};

export default ParameterForm;
