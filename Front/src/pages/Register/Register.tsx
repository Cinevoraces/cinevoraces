import Metrics from 'components/Metrics/Metrics';
import Loader from 'components/Loader/Loader';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import { InputText, Button } from 'components/Inputs/InputsLib';
import { useEffect, useState } from 'react';
import { useRegisterMutation } from 'redux/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userState } from 'redux/slices/user';
import { addToast, toggleModal } from 'redux/slices/global';
import styles from './Register.module.scss';
import Footer from 'components/Layout/Footer';

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {id, isOnline} = useAppSelector(userState);
  const [addUser, {error, isLoading, isError, isSuccess}] = useRegisterMutation();
  // Controlled input states
  const [mailField, setMailField]         = useState('');
  const [pseudoField, setPseudoField]     = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [confirmField, setConfirmField]   = useState('');

  // Fields states handlers
  const handleMailField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailField(e.currentTarget.value);
  };
  const handlePseudoField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudoField(e.currentTarget.value);
  };
  const handlePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordField(e.currentTarget.value);
  };
  const handleConfirmField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmField(e.currentTarget.value);
  };

  // Resolve password errors
  const formRegEx = (string: string) => {
    if (RegExp(process.env.REACT_APP_PASS_REGEX!).test(String(string!))) { // eslint-disable-line
      return true;
    } else {
      return false;
    }};
  const dispatchToastError = (error: string) => {
    dispatch(addToast({type:'error', text: error}));
  };
  const sendFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateRequest({
      pseudo: pseudoField,
      mail: mailField,
      password: passwordField,
      confirm: confirmField
    });
  };
  const validateRequest = async (user: {[key: string]: string}) => {
    if (!user.mail) {
      dispatchToastError('Vous devez indiquer une adresse email valide.');
    } else if (!user.pseudo) {
      dispatchToastError('Vous devez indiquer un nom d\'utilisateur valide.');
    } else if (!user.password) {
      dispatchToastError('Vous devez définir un mot de passe.');
    } else if (!formRegEx(user.password)) {
      dispatchToastError('Votre mot de passe est invalide.');
    } else if (!user.confirm) {
      dispatchToastError('Vous devez confirmer votre mot de passe.');
    } else if (user.password !== user.confirm) {
      dispatchToastError('Le mot de passe ne correspond pas au champ de confirmation.');
    } else {
      delete user.confirm;
      await addUser(user);
    }};

  // Handle registering success
  useEffect(() => {
    if (isSuccess) {
      dispatch(addToast({type:'success', text: 'Votre compte à été créé, vous pouvez vous connecter'}));
      dispatch(toggleModal());
      return navigate('/');
    }}, [isSuccess]);
  // Handle registering errors
  useEffect(() => {
    if (isError && 'status' in error!) {
      (error.status === 400) && dispatchToastError('Ce nom d\'utilisateur ou cette adresse mail n\'est pas disponible.');
    }}, [isError]);
  // Handle redirection if connected
  useEffect(() => {
    isOnline && navigate(`/user/${id}`);
  }, [isOnline]);

  return(
    <AnimationLayout>
      {isLoading &&
        <Loader isMaxed={true}/>}
      <main className={styles.register}>
        <form onSubmit={sendFormHandler} className={styles.form}>
          <h1 className={styles.title}>Créer un compte</h1>
          <InputText
            label='Email'
            name='email'
            placeholder='Entrez votre email'
            type='email'
            handler={handleMailField}
            value={mailField}
          />
          <InputText
            label='Nom d’utilisateur'
            name='username'
            placeholder='Entrez votre nom d’utilisateur'
            type='text'
            handler={handlePseudoField}
            value={pseudoField}
          />
          <InputText
            label='Mot de passe'
            name='password'
            placeholder='Entrez votre mot de passe'
            type='password'
            handler={handlePasswordField}
            value={passwordField}
          />
          <InputText
            name='confirm'
            placeholder='Confirmez votre mot de passe'
            type='password'
            handler={handleConfirmField}
            value={confirmField}
          />
          <div className={styles.rules}>
            Votre mot de passe doit contenir au moins une majuscule, une minuscule, un symbôle et un chiffre et doit contenir au moins 8 caractères.
          </div>

          <Button
            styleMod='fill-rounded'
          >
            <img src='/images/send-icon.svg' alt='' />
            Envoyer
          </Button>
        </form>
        <img className={styles.img} src='/images/register-img.png' alt='' />
      </main>
      <Metrics/>
      <Footer/>
    </AnimationLayout>
  );
}

export default Register;