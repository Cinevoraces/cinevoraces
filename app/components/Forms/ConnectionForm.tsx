import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@store/store';
import Button from '@components/Input/Button';
import { RefTextInput, Toggle } from '@components/Input';
import { toggleConnectionModal } from '@store/slices/global';
import { toggleArePWVisible, global } from '@store/slices/global';
import { mutationRequestCSR } from 'binders';
import { login } from '@store/slices/user';
import { toast } from 'react-hot-toast';
import tryCatchWrapper from '@utils/tryCatchWrapper';
import type { BodyData } from 'models/custom_types';

const ConnectionForm = () => {
  const isPWVisible = useAppSelector(global).arePWVisible;
  const dispatch = useAppDispatch();

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const allInputsRef = [identifierRef, passwordRef];

  const submitSuccess = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: BodyData) => {
    const responseData = await mutationRequestCSR(method, endpoint, data);
    if (responseData.statusCode){ // To be enhanced later with a proper error validation base on statusCodes
      throw new Error(responseData.message);
    };
    toast.success(responseData.message);
    // State Mutation
    dispatch(login(responseData.user));
    // Save the accessToken in the localStorage
    window.localStorage.setItem('accessToken', responseData.token);
    // Closing modal
    dispatch(toggleConnectionModal());
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>, allInputsRef: React.RefObject<HTMLInputElement>[]) => {
    e.preventDefault();
    // Passing all inputs as required
    allInputsRef.forEach((inputRef) => {
      if (inputRef.current) inputRef.current.required = true;
    });
    // Checking all inputs validation status
    const inputValidationStatus = allInputsRef.map((inputRef) => inputRef.current?.reportValidity());
    if (!inputValidationStatus.includes(false)) {
      // Check the identifier nature
      const identifierType = (new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(identifierRef.current!.value)) 
        ? 'mail' 
        : 'pseudo';
      const data = {
        password: passwordRef.current!.value,
        [identifierType]: identifierRef.current!.value,
      };
      tryCatchWrapper(submitSuccess)('POST', '/login', data);
    }
  };

  return (
    <form
      action="submit"
      onSubmit={ async (e) => handleSubmit(e, allInputsRef)}
      className="flex flex-col w-full gap-3">
      <RefTextInput
        id="identifier"
        label="Email ou nom d'utilisateur"
        placeholder="Votre identifiant..."
        minLength={3}
        errorMessage="Saisissez un identifiant"
        ref={identifierRef}
      />
      <RefTextInput
        type={!isPWVisible ? 'password' : undefined}
        id="password"
        label="Entrez votre mot de passe"
        placeholder="Mot de passe..."
        errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
        ref={passwordRef}
      />
      <Toggle
        id="showPasswordConnection"
        name="showPasswordConnection"
        label="Montrer le mot de passe ?"
        checked={isPWVisible}
        onChange={() => dispatch(toggleArePWVisible())}
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

export default ConnectionForm;
