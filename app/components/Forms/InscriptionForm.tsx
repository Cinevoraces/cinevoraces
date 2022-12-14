import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@store/store';
import { TextInputRef, Toggle } from '@components/Input';
import { toggleArePWVisible, global } from '@store/slices/global';
import Button from '@components/Input/Button';
import SendLogo from '@public/icons/send-icon.svg';
import { mutationRequestCSR } from '@utils/fetchApi';
import { toast } from 'react-hot-toast';
import tryCatchWrapper from '@utils/tryCatchWrapper';
import type { BodyData } from '@utils/fetchApi';

export default function InscriptionForm() {
  const isPWVisible = useAppSelector(global).arePWVisible;
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const PWRef = useRef<HTMLInputElement>(null);
  const confirmPWRef = useRef<HTMLInputElement>(null);
  const allInputsRef = [emailRef, usernameRef, PWRef, confirmPWRef];

  const [arePWMatching, setArePWMatching] = useState(true);

  const helpingTextStyle = 'px-1 text-sm font-light italic text-gray-300';

  const matchingErrorMessage = 'Les deux saisies ne correspondent pas.';

  const router = useRouter();
  const submitSuccess = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: BodyData) => {
    const responseData = await mutationRequestCSR(method, endpoint, data);
    toast.success(responseData.message);
    router.push('/');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    allInputsRef: React.RefObject<HTMLInputElement>[]
  ) => {
    e.preventDefault();
    // Passing all inputs as required
    allInputsRef.forEach((inputRef) => {
      if (inputRef.current) inputRef.current.required = true;
    });
    // Checking PW correspondance
    setArePWMatching(PWRef.current?.value === confirmPWRef.current?.value);
    if (!arePWMatching) {
      confirmPWRef.current?.setCustomValidity(matchingErrorMessage);
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
      tryCatchWrapper(submitSuccess)('POST', '/register', data);
    }
  };

  return (
    <form
      action="submit"
      onSubmit={async (e) => handleSubmit(e, allInputsRef)}
      className="flex flex-col w-full gap-6">
      <TextInputRef
        type="email"
        id="email"
        label="Email"
        placeholder="Votre email..."
        errorMessage="Saisissez une addresse mail."
        ref={emailRef}
      />
      <p className={helpingTextStyle}>{'Votre email sera utilis?? pour la r??cup??ration de votre mot de passe.'}</p>
      <TextInputRef
        id="username"
        label="Nom d'utilisateur"
        placeholder="Votre nom d'utilisateur..."
        minLength={3}
        errorMessage="Saisissez un nom d'utilisateur de plus de 3 lettres."
        ref={usernameRef}
      />
      <p className={helpingTextStyle}>{'Doit comporter au moins 3 caract??res, espaces autoris??s.'}</p>
      <div className="flex flex-col gap-3">
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Entrez votre mot de passe"
          placeholder="Mot de passe..."
          pattern={process.env.NEXT_PUBLIC_PASS_REGEXP}
          errorMessage="La saisie ne r??ponds pas aux exigences de s??curit??."
          ref={PWRef}
        />
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          placeholder="Confirmer votre mot de passe..."
          pattern={process.env.NEXT_PUBLIC_PASS_REGEXP}
          errorMessage={!arePWMatching ? matchingErrorMessage : 'La saisie ne r??ponds pas aux exigences de s??curit??.'}
          ref={confirmPWRef}
        />
        <Toggle
          id="showPasswordInscription"
          name="showPasswordInscription"
          label="Montrer le mot de passe ?"
          checked={isPWVisible || false}
          onChange={() => dispatch(toggleArePWVisible())}
        />
        <p className={helpingTextStyle}>
          Longueur minimale : 12 caract??res.<br/>
          Doit comprendre au moins une majuscule, une minuscule, un chiffre et un symbole parmi ! # $ % * + = ? | -
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
