import tryCatchWrapper from '@utils/tryCatchWrapper';
import { mutationRequestCSR } from 'binders';
import { toast } from 'react-hot-toast';

import type { BodyData } from 'models/custom_types';

const submitSuccess = async (
  method: 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: BodyData,
) => {
  const responseBody = await mutationRequestCSR(method, endpoint, data);
  toast.success(responseBody.message + '\n Le changement sera effectif dans quelques instants.');
};

export const handleAvatarUpload = async (
  e: React.FormEvent,
  avatar: File | undefined,
) => {
  e.preventDefault();
  const formData = new FormData();
  if (avatar) {
    formData.append('avatar', avatar, avatar.name);
    tryCatchWrapper(submitSuccess)('PUT', '/users/avatar', formData);
  }
};
