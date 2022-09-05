import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import { usePutUserMutation } from 'redux/api';
import { userState } from 'redux/slices/user';
import { PictureField, Field } from './UserInfo.Field';
import styles from './UserInfo.module.scss';

function UserInfo() {
  const dispatch = useAppDispatch();
  const {id, avatar, pseudo: statePseudo, mail: stateMail} = useAppSelector(userState);
  const [updateUser, {isError, isSuccess, reset, error}] = usePutUserMutation();
  // Field selector
  const [fieldSelector, setFieldSelector] = useState([false, false, false]);
  const handleUpdateField = (index: number) => {
    const newState: boolean[] = [];
    fieldSelector.forEach((e, i) => {
      (i === index && e !== true) ? newState.push(true) : newState.push(false);
    });
    setFieldSelector(newState);
  };
  // Controlled inputs states
  const [pseudo, setPseudo]             = useState('');
  const [mail, setMail]                 = useState('');
  const [password, setPassword]         = useState('');
  const [newPassword, setNewPassword]   = useState('');
  const [confirm, setConfirm]           = useState('');
  const statesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    (e.currentTarget.name === 'username')    && setPseudo(e.currentTarget.value);
    (e.currentTarget.name === 'email')       && setMail(e.currentTarget.value);
    (e.currentTarget.name === 'password')    && setPassword(e.currentTarget.value);
    (e.currentTarget.name === 'newPassword') && setNewPassword(e.currentTarget.value);
    (e.currentTarget.name === 'confirm')     && setConfirm(e.currentTarget.value);
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
    if (password.length === 0) {
      return dispatchToastError('Vous devez renseigner votre mot de passe.');
    }
    // Init body
    const body: {userId: number, user: {[key: string]: string}} = {
      userId: id!,
      user: {oldPassword: password}};

    // Resolve field
    if (fieldSelector[0]) { // Email
      if (mail.length === 0) {
        return dispatchToastError('Vous devez indiquer une adresse email valide.');
      }
      body.user = {mail: mail, ...body.user};
    }
    if (fieldSelector[1]) { // Username
      if (pseudo.length === 0) {
        return dispatchToastError('Vous devez indiquer un nom d\'utilisateur valide.');
      }
      body.user = {pseudo: pseudo, ...body.user};
    }
    if (fieldSelector[2]) { // Username
      // handle errors
      if (confirm.length === 0) {
        return dispatchToastError('Vous devez confirmer votre mot de passe.');
      } else if (!formRegEx(password)) {
        return dispatchToastError('Votre mot de passe est invalide.');
      } else if (password !== confirm) {
        return dispatchToastError('Le mot de passe ne correspond pas au champ de confirmation.');
      }
      // update body
      body.user = {password: password, ...body.user};
    }
    await updateUser(body);
  };
  
  // Handle update success
  useEffect(() => {
    if (isSuccess) {
      dispatch(addToast({type: 'success', text: 'Informations mises à jour avec succés.'}));
      // Reset all fields/states
      reset();
      setPseudo('');
      setMail('');
      setPassword('');
      setNewPassword('');
      setConfirm('');
      setFieldSelector([false, false, false]);
    }}, [isSuccess]);
  // Handle update errors
  useEffect(() => {
    if (isError && 'status' in error!) {
      (error.status === 400) && dispatchToastError('Ce nom d\'utilisateur ou cette adresse mail n\'est pas disponible.');
    }}, [isError]);

  return(
    <form className={styles['user-params']} onSubmit={sendFormHandler}> 
      <PictureField
        avatar={avatar}
      />
      <Field
        type='email'
        state={mail}
        password={password}
        confirm={confirm}
        handler={statesHandler}
        value={stateMail}
        fieldState={fieldSelector[0]}
        fieldSetter={() => {handleUpdateField(0);}}
      />
      <Field
        type='username'
        state={pseudo}
        password={password}
        confirm={confirm}
        handler={statesHandler}
        value={statePseudo}
        fieldState={fieldSelector[1]}
        fieldSetter={() => {handleUpdateField(1);}}
      />
      <Field
        type='password'
        state={newPassword}
        password={password}
        confirm={confirm}
        handler={statesHandler}
        fieldState={fieldSelector[2]}
        fieldSetter={() => {handleUpdateField(2);}}
      />
    </form>
  );
}

export default UserInfo;