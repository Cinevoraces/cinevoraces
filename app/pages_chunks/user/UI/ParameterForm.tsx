import type { ChangeEvent, FormEvent, RefObject } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@store/store';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleArePWVisible, global } from '@store/slices/global';
import Button from '@components/Input/Button';
import SendLogo from '@public/icons/send-icon.svg';
import { File } from '@components/Input';
import { matchingErrorMessage, handleSubmit, handleAvatarUpload } from '../business_logic/formSubmit';
import type { KeyedMutator } from 'swr';
import type { User } from '@custom_types/index';

interface ParameterFormInterface {
  mutate: KeyedMutator<User[]>;
  mail: string;
}

const ParameterForm = ({ mutate, mail }: ParameterFormInterface) => {
  const isPWVisible = useAppSelector(global).arePWVisible;
  const dispatch = useAppDispatch();

  const profilePicRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const PWRef = useRef<HTMLInputElement>(null);
  const newPWRef = useRef<HTMLInputElement>(null);
  const confirmNewPWRef = useRef<HTMLInputElement>(null);
  // const allInputsRef = [emailRef, usernameRef, PWRef, newPWRef, confirmNewPWRef];
  const allInputsRef: {[key: string]: RefObject<HTMLInputElement> } = {
    'emailRef': emailRef, 
    'usernameRef': usernameRef, 
    'PWRef': PWRef, 
    'newPWRef': newPWRef, 
    'confirmNewPWRef': confirmNewPWRef };

  const [arePWMatching, setArePWMatching] = useState(true);

  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

  const [avatar, setAvatar] = useState<File>();

  return (
    <div className="flex flex-col gap-6">
      <form 
        action="submit"
        className="flex flex-col gap-6 w-full max-w-xl border px-6 py-4 border-orange-primary rounded-xl"
        onSubmit={(e) => handleAvatarUpload(e, avatar, mutate)}>
        <File fileSetter={setAvatar}/>
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
      <form
        action="submit"
        // onSubmit={async (e) => handleSubmit(e, allInputsRef)}
        onSubmit={async (e) =>
          handleSubmit(
            e,
            allInputsRef,
            arePWMatching,
            setArePWMatching,
            mutate,
            dispatch,
          )
        }
        className="flex flex-col w-full gap-6 max-w-xl border px-6 py-4 border-orange-primary rounded-xl">
        <div className="flex flex-col gap-1">
          <TextInputRef
            type="email"
            id="email"
            label="Modifier votre email"
            placeholder="Votre nouvel email..."
            errorMessage="Saisissez une addresse mail."
            ref={emailRef}
          />
          <p className={helpingTextStyle}>
            Mon addresse actuelle : <span className="emphasis">{mail}</span>
          </p>
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
            Longueur minimale : 12 caractères.
            <br />
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
    </div>
  );
};

export default ParameterForm;
