import CustomHead from '@components/Head';
import { useState } from 'react';
import useSWR from 'swr';
import { mutationRequestCSR } from 'binders';
import { user } from '@store/slices/user';
import { Roles } from 'models/enums';
import { useAppDispatch, useAppSelector } from '@store/store';
import { toggleConfirmationModal, global } from '@store/slices/global';
import Modal from '@components/Modal';
import tryCatchWrapper from '@utils/tryCatchWrapper';
import { toast } from 'react-hot-toast';
import { ConfirmationForm, FileManagement, PropositionsSection, UsersSection } from 'pages_chunks/administration/UI';

import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import type { AdminActions } from 'models/enums';
import type { User, MovieWithPresentation } from 'models/custom_types/index';
import type { HandleSubmitAction, HandleSubmitActions } from 'models/custom_types/index';

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
    // No response data as it is a 204 success Status
    toast.success(response.message);
    endpoint.includes('users') ? usersMutate() : propositionsMutate();
    userMutate();
    return handleOpenConfirmationModal();
  };
  // Edition actions
  const handleMoviePublishing = async (e: FormEvent, data: { password: string }, id?: number) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('PUT', `/admin/movies/publish/${id}`, data);
  };
  const handleMovieDeletion = (e: FormEvent, data: { password: string }, id?: number) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('DELETE', `/admin/movies/${id}`, data);
  };
  const handleUserDeletion = (e: FormEvent, data: { password: string }, id?: number) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('DELETE', `/admin/users/${id}`, data);
  };
  const handlePostersImport = (e: FormEvent, data: { password: string }) => {
    e.preventDefault();
    tryCatchWrapper(submitSuccess)('PUT', '/admin/movies/update-posters', data);
  };

  const handleSubmitActions: HandleSubmitActions = {
    0: { description: 'la publication du film', handlingFunction: handleMoviePublishing },
    1: { description: 'la suppression du film', handlingFunction: handleMovieDeletion },
    2: { description: 'la suppression de l\'utilisateur', handlingFunction: handleUserDeletion },
    3: { description: 'l\'import des posters depuis TMDB', handlingFunction: handlePostersImport },
  };
  // Arbitrary initial State
  const [confirmationAction, setConfirmationAction] = useState<{ handlingAction: HandleSubmitAction; id?: number }>({
    handlingAction: {
      description: 'Erreur',
      handlingFunction: (e: FormEvent, data: { password: string }, id?: number) => console.log(id, data),
    },
    id: 0,
  });
  const handleConfirmationModal = (action: AdminActions, id?: number) => {
    setConfirmationAction({ handlingAction: handleSubmitActions[action], id });
    handleOpenConfirmationModal();
  };

  return (
    <>
      <CustomHead
        title="Cinévoraces - Administration"
        description="Back Office, pour les administrateurices"
        slug="/administration"
      />
      <main>
        <h1 className="custom-container items-start hero-text">Administration</h1>
        {!isAdmin ? (
          <p className="custom-container">Cette section est réservée aux admins.</p>
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
            <FileManagement handleConfirmationModal={handleConfirmationModal}/>
          </>
        )}
      </main>
      {isConfirmationModalOpen && (
        <Modal
          stateValue={isConfirmationModalOpen}
          setter={handleOpenConfirmationModal}>
          {confirmationAction && <ConfirmationForm {...confirmationAction} />}
        </Modal>
      )}
    </>
  );
};
export default Administration;
