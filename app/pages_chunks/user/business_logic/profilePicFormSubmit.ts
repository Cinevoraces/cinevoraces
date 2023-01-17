import tryCatchWrapper from '@utils/tryCatchWrapper';
import { mutationRequestCSR } from 'binders/fetchApi';
import { toast } from 'react-hot-toast';
import { setUserModification } from '@store/slices/user';

import type { RefObject, SetStateAction } from 'react';
import type { KeyedMutator } from 'swr';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { BodyData } from 'binders/fetchApi';
import type { User } from 'models/custom_types/index';
import type { UserProps } from '@store/slices/user';

const submitSuccess = async (
  method: 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  userMutation: KeyedMutator<User[]>,
  dispatch: ThunkDispatch<{ user: UserProps }, undefined, AnyAction>,
  data?: BodyData
) => {
  const responseBody = await mutationRequestCSR(method, endpoint, data);
  const user = await userMutation();
  if (user && user.length > 0) dispatch(setUserModification({ avatar_url: user[0].avatar_url }));
  toast.success(responseBody.message);
};

export const handleAvatarUpload = async (
  e: React.FormEvent,
  avatar: File | undefined,
  userMutation: KeyedMutator<User[]>,
  dispatch: ThunkDispatch<{ user: UserProps }, undefined, AnyAction>
) => {
  e.preventDefault();
  const formData = new FormData();
  if (avatar) {
    formData.append('avatar', avatar, avatar.name);
    tryCatchWrapper(submitSuccess)('PUT', '/users/avatar', userMutation, dispatch, formData);
  }
};
