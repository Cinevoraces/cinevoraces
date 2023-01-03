import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { mutationRequestCSR } from '@utils/fetchApi';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import { Roles } from '@custom_types/index';
import { AdminActions } from 'enums';

import PropositionsSection from 'pages_chunks/administration/UI/PropositionsSection';
import UsersSection from 'pages_chunks/administration/UI/UsersSection';
import Modal from '@components/Modal';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';

const Administration = () => {
  // User role check
  const isAdmin = useAppSelector(user).role === Roles.ADMIN;
  // Data fetching
  const {
    data: propositions,
    error: propositionsError,
    mutate: propositionsMutate,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSWR<any, Error>('/movies?select[presentation]=true&where[is_published]=false');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: users, error: usersError, mutate: usersMutate } = useSWR<any, Error>('/users');
  // Data vizualization ---------- TEMP -----------------------------------------------------
  useEffect(() => {
    propositions && console.log('propositions : ', propositions);
  }, [propositions]);
  useEffect(() => {
    users && console.log('users : ', users);
  }, [users]);

  // Confirmation Modal and pw management
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState<boolean>(false);
  const handleOpenPWModal = () => setIsConfirmationModalOpened(!isConfirmationModalOpened);
  const handleConfirmationModal = (action: AdminActions, id: number) => {
    setIsConfirmationModalOpened(!isConfirmationModalOpened);
    console.log('On confirme le truc là, sur ?');
  };
  const pwModalRef = useRef<HTMLElement>(null);
  useCloseMenuOnOutsideClick(pwModalRef, 'modal', isConfirmationModalOpened, handleOpenPWModal);
  const password = useRef<string>('');

  // Edition actions
  const handleMoviePublishing = (id: number, data: { password: string }) => {
    mutationRequestCSR('PUT', `admin/movies/publish/${id}`, data);
  };
  const handleMovieDeletion = (id: number, data: { password: string }) => {
    mutationRequestCSR('DELETE', `/admin/movies/${id}`, data);
  };
  const handleUserDeletion = (id: number, data: { password: string }) => {
    mutationRequestCSR('DELETE', `/admin/users/${id}`, data);
  };
  const handleSubmitActions = [
    { actionType: AdminActions.PUBLISHMOVIE, description: 'publication du film', handlingFunction: handleMoviePublishing },
    { actionType: AdminActions.DELETEMOVIE, description: 'suppression du film', handlingFunction: handleMovieDeletion },
    { actionType: AdminActions.DELETEUSER, description: 'suppression de l\'utilisateur', handlingFunction: handleUserDeletion },
  ];

  return (
    <>
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
            />
          </>
        )}
      </main>
      {isConfirmationModalOpened && (
        <Modal
          stateValue={isConfirmationModalOpened}
          setter={handleOpenPWModal}
          ref={pwModalRef}>
          <form action="submit">
            <p>TOTO</p>
          </form>
        </Modal>
      )}
    </>
  );
};
export default Administration;
