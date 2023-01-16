import { mutationRequestCSR } from '@utils/fetchApi';
import type { BodyData } from '@utils/fetchApi';
import type { RefObject, SetStateAction } from 'react';
import type { KeyedMutator } from 'swr';
import type { User } from '@custom_types/index';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { UserProps } from '@store/slices/user';
import { setUserModification } from '@store/slices/user';
import { toast } from 'react-hot-toast';
import tryCatchWrapper from '@utils/tryCatchWrapper';

const submitSuccess = async (
  allInputRefs: RefObject<HTMLInputElement>[],
  method: 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  userMutation: KeyedMutator<User[]>,
  dispatch: ThunkDispatch<{ user: UserProps }, undefined, AnyAction>,
  data?: BodyData
) => {
  const responseBody = await mutationRequestCSR(method, endpoint, data);
  // Clean input values before sending
  Object.values(allInputRefs).forEach((i) => {
    if (i.current) {
      i.current.value = '';
      i.current.required = false;
    }
  });
  const user = await userMutation();
  if (user && user.length > 0) dispatch(setUserModification({ pseudo: user[0].pseudo }));
  toast.success(responseBody.message);
};

export const matchingErrorMessage = 'Les deux saisies ne correspondent pas.';

export const handleTextSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  allInputsRef: {[key: string]: RefObject<HTMLInputElement> },
  arePWMatching: boolean,
  setArePWMatching: (value: SetStateAction<boolean>)=>void,
  userMutation: KeyedMutator<User[]>,
  dispatch: ThunkDispatch<{ user: UserProps }, undefined, AnyAction>
) => {
  e.preventDefault();
  // Checking which inputs are used and current PW
  const modifiers = Object.values(allInputsRef).filter((i) => i.current && (i.current.value || i === allInputsRef['PWRef']));
  // Passing all used input as required
  modifiers.forEach((i) => {
    if (i.current) i.current.required = true;
  });
  // If no modification is asked, but pwd confirmation field filled, notify user
  if (modifiers.length === 1 && modifiers.includes(allInputsRef['PWRef'])) {
    return toast.error('Vous n\'avez demandé aucune modification.');
  }
  // Checking PW correspondance if password modification requested
  if (allInputsRef['newPWRef'].current && allInputsRef['newPWRef'].current.value) {
    setArePWMatching(
      !allInputsRef['newPWRef'].current?.value && !allInputsRef['confirmNewPWRef'].current?.value
        ? true
        : allInputsRef['newPWRef'].current?.value === allInputsRef['confirmNewPWRef'].current?.value
    );
    if (!arePWMatching) {
      allInputsRef['confirmNewPWRef'].current?.setCustomValidity(matchingErrorMessage);
      return;
    }
  }
  // Checking all inputs validation status
  const inputValidationStatus = Object.values(allInputsRef).map(
    (inputRef) => inputRef.current?.value && inputRef.current?.reportValidity()
  );
  if (inputValidationStatus.length > 1 && !inputValidationStatus.includes(false)) {
    const update_user: {[key: string]: string } = {};
    if (modifiers.includes(allInputsRef['emailRef']) && allInputsRef['emailRef'].current) update_user['mail'] = allInputsRef['emailRef'].current.value;
    if (modifiers.includes(allInputsRef['usernameRef']) && allInputsRef['usernameRef'].current) update_user['pseudo'] = allInputsRef['usernameRef'].current.value;
    if (modifiers.includes(allInputsRef['newPWRef']) && allInputsRef['newPWRef'].current) update_user['password'] = allInputsRef['newPWRef'].current.value;
    const data = {
      password: allInputsRef['PWRef'].current!.value,
      update_user,
    };
    tryCatchWrapper(submitSuccess)(allInputsRef, 'PUT', '/users', userMutation, dispatch, data);
  }
};

