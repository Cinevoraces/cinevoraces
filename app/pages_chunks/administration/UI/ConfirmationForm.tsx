import { useRef } from 'react';
import { Button, TextInputRef, Toggle } from '@components/Input';
import { global, toggleArePWVisible } from '@store/slices/global';
import { useAppDispatch, useAppSelector } from '@store/store';

interface ConfirmationFormProps{
  actionType: string;
  handlingFunction: (id: number, data: { password: string })=>void [];
}

const ConfirmationForm = ({ actionType, handlingFunction }: ConfirmationFormProps) => {
  const dispatch = useAppDispatch();
  const isPWVisible = useAppSelector(global).arePWVisible;
  const pwModalRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <h2 className="section-title">Confirmer</h2>
      <form action="submit">
        <TextInputRef
          type={!isPWVisible ? 'password' : undefined}
          id="password"
          label="Entrez votre mot de passe"
          placeholder="Mot de passe..."
          errorMessage="Le mot de passe ne respecte pas les règles de sécurité."
          ref={pwModalRef}
        />
        <Toggle
          id="showPasswordConnection"
          name="showPasswordConnection"
          label="Montrer le mot de passe ?"
          checked={isPWVisible}
          onChange={() => dispatch(toggleArePWVisible())}
        />
        <Button>Confirmer</Button>
      </form>
    </>
  );
};
export default ConfirmationForm;
