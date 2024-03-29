import type { FormEvent } from 'react';
import { useRef } from 'react';
import { Button, RefTextInput, Toggle } from '@components/Input';
import { global, toggleArePWVisible } from '@store/slices/global';
import { useAppDispatch, useAppSelector } from '@store/store';

import type { HandleSubmitAction } from 'models/custom_types/index';

interface ConfirmationFormProps {
  handlingAction: HandleSubmitAction;
  id?: number;
}

const ConfirmationForm = ({ handlingAction: { description, handlingFunction }, id }: ConfirmationFormProps) => {
  const dispatch = useAppDispatch();
  const isPWVisible = useAppSelector(global).arePWVisible;
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) =>
    handlingFunction(e, { password: passwordRef.current ? passwordRef.current?.value : '' }, id);
  return (
    <>
      <h2 className="title-section mb-4">{`Confirmez ${description}`}</h2>
      <form
        className="flex flex-col w-full gap-3"
        action="submit"
        onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
        <div>
          <Button disabled={!id && description.includes('film') && true}>Confirmer</Button>
          <p className={!id && description.includes('film') ? 'text-sm font-light text-red-500 text-right' : 'hidden'}>
            {'N\'oubliez pas d\'effectuer une sélection!'}
          </p>
        </div>
      </form>
    </>
  );
};
export default ConfirmationForm;
