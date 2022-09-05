import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { useLoginMutation } from 'redux/api';
import { addToast, toggleModal } from 'redux/slices/global';
import { login } from 'redux/slices/user';
import { Button, InputText } from 'components/Inputs/InputsLib';
import Loader from 'components/Loader/Loader';
import styles from './Connection.module.scss';

/**
 * @returns Connection form
 */
function Connection() {
  const dispatch = useAppDispatch();
  const [loginUser, {data: userData, isSuccess, isLoading}] = useLoginMutation();
  const [pseudoField, setPseudoField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  // Fields states handlers
  const handlePseudoField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudoField(e.currentTarget.value);
  };
  const handlePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordField(e.currentTarget.value);
  };
  // Login handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
      pseudo: pseudoField,
      password: passwordField
    });
  };
  const handleModal = () => {
    dispatch(toggleModal());
  };

  // Handle connection success
  useEffect(() => {
    if (isSuccess) {
      dispatch(login(userData)); // Update local user state
      dispatch(toggleModal());  // Close modal
      dispatch(addToast({type:'success', text: `Bienvenue ${userData!.pseudo}`})); // Show success message
    }}, [isSuccess]);
  
  return (
    <> 
      {isLoading &&
        <Loader isMaxed/>}
      <form className={styles.connection} onSubmit={handleLogin}>
        <InputText 
          label="Nom d'utilisateur"
          name='username'
          type='text'
          placeholder='Entrez votre nom d’utilisateur'
          handler={handlePseudoField}
          value={pseudoField}
        />
        <InputText 
          label='Mot de passe'
          name='password'
          type='password'
          placeholder='Entrez votre mot de passe'
          handler={handlePasswordField}
          value={passwordField}
        />
        <div className={styles['button-container']}>
          <Button styleMod='fill'>
            Se connecter
          </Button>
          <Button to='/register' handler={handleModal}>
            S'inscrire
          </Button>
        </div>
      </form>
    </>
  );
}

export default Connection;