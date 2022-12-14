import type { NextPage } from 'next';
import CustomHead from '@components/Head';
import type { FormEvent } from 'react';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { mutationRequestCSR } from '@utils/fetchApi';
import { user } from '@store/slices/user';
import { Roles } from '@custom_types/index';
import type { AdminActions } from 'enums';
import { useAppDispatch, useAppSelector } from '@store/store';
import { toggleConfirmationModal, global } from '@store/slices/global';
import type { User, MovieWithPresentation } from '@custom_types/index';

import PropositionsSection from 'pages_chunks/administration/UI/PropositionsSection';
import UsersSection from 'pages_chunks/administration/UI/UsersSection';
import Modal from '@components/Modal';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import ConfirmationForm from 'pages_chunks/administration/UI/ConfirmationForm';

import tryCatchWrapper from '@utils/tryCatchWrapper';
import { toast } from 'react-hot-toast';

import type { HandleSubmitAction, HandleSubmitActions } from '@custom_types/index';

const Administration: NextPage = () => {
  // User role check
  const { id, role } = useAppSelector(user);
  const isAdmin = role === Roles.ADMIN;
  // Data fetching
  const {
    data: propositions,
    error: propositionsError,
    mutate: propositionsMutate,
  } = useSWR<MovieWithPresentation[], Error>('/movies?select[presentation]=true&where[is_published]=false');
  const { data: users, error: usersError, mutate: usersMutate } = useSWR<User[], Error>('/users');
  // In case the user is also admin and publishes its own movie
  const { mutate: userMutate } = useSWR(`/users?select[propositions]=true&where[id]=${id}`);
  // Global state management
  const dispatch = useAppDispatch();
  const isConfirmationModalOpen = useAppSelector(global).isConfirmationModalOpen;
  const handleOpenConfirmationModal = () => dispatch(toggleConfirmationModal());
  const submitSuccess = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, data: { password: string }) => {
    const response = await mutationRequestCSR(method, endpoint, data);
    console.log('response: ', response);
    // No response data as it is a 204 success Status
    toast.success(
      `${method === 'PUT' ? 'Publication' : 'Supression'} ${
        endpoint.includes('users') ? 'du membre' : 'de la proposition'
      } r??ussie`
    );
    endpoint.includes('users') ? usersMutate() : propositionsMutate();
    userMutate();
    return handleOpenConfirmationModal();
  };
  // Edition actions
  const handleMoviePublishing = async (e: FormEvent, id: number, data: { password: string }) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('PUT', `/admin/movies/publish/${id}`, data);
  };
  const handleMovieDeletion = (e: FormEvent, id: number, data: { password: string }) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('DELETE', `/admin/movies/${id}`, data);
  };
  const handleUserDeletion = (e: FormEvent, id: number, data: { password: string }) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('DELETE', `/admin/users/${id}`, data);
  };

  const handleSubmitActions: HandleSubmitActions = {
    0: { description: 'la publication du film', handlingFunction: handleMoviePublishing },
    1: { description: 'la suppression du film', handlingFunction: handleMovieDeletion },
    2: { description: 'la suppression de l\'utilisateur', handlingFunction: handleUserDeletion },
  };
  // Arbitrary initial State
  const [confirmationAction, setConfirmationAction] = useState<{ handlingAction: HandleSubmitAction; id: number }>({
    handlingAction: {
      description: 'Erreur',
      handlingFunction: (e: FormEvent, id: number, data: { password: string }) => console.log(id, data),
    },
    id: 0,
  });
  const handleConfirmationModal = (action: AdminActions, id: number) => {
    setConfirmationAction({ handlingAction: handleSubmitActions[action], id });
    handleOpenConfirmationModal();
  };
  const pwModalRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(pwModalRef, 'modal', isConfirmationModalOpen, handleOpenConfirmationModal);

  return (
    <>
      <CustomHead
        title="Cin??voraces - Administration"
        description="Back Office, pour les administrateurices"
        slug="/administration"
      />
      <main>
        <h1 className="custom-container items-start hero-text">Administration</h1>
        {!isAdmin ? (
          <p className="custom-container">Cette section est r??serv??e aux admins.</p>
        ) : (
          <>
            <PropositionsSection
              propositions={propositions}
              error={propositionsError}
              handleConfirmationModal={handleConfirmationModal}
            />
            <UsersSection
              users={users}
              error={usersError}
              handleConfirmationModal={handleConfirmationModal}
            />
          </>
        )}
      </main>
      {isConfirmationModalOpen && (
        <Modal
          stateValue={isConfirmationModalOpen}
          setter={handleOpenConfirmationModal}
          ref={pwModalRef}>
          {confirmationAction && <ConfirmationForm {...confirmationAction} />}
        </Modal>
      )}
    </>
  );
};
export default Administration;
