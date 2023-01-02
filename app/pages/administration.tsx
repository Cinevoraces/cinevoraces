import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { mutationRequestCSR } from '@utils/fetchApi';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import { Roles } from '@custom_types/index';
// import type { User, Proposition } from '@custom_types/index';

import PropositionsSection from 'pages_chunks/administration/UI/PropositionsSection';
import UsersSection from 'pages_chunks/administration/UI/UsersSection';
import Modal from '@components/Modal';

// TO DO once merged with user page, add correct types ---------------------------------------
const Administration = () => {
  const isAdmin = (useAppSelector(user).role === Roles.ADMIN);
  console.log(isAdmin);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: propositions, error: propositionsError, mutate: propositionsMutate } = useSWR<any, Error>('/movies?where[is_published]=false');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: users, error: usersError, mutate: usersMutate } = useSWR<any, Error>('/users');
  useEffect(() => {
    propositions && console.log('propositions : ', propositions);
  }, [propositions]);
  useEffect(() => {
    users && console.log('users : ', users);
  }, [users]);

  const [isConfirmationModalOpened, setIsConfirmationModalOpened] = useState<boolean>(false);
  const setConfirmationModal = (action: string, id: number) => {
    setIsConfirmationModalOpened(isConfirmationModalOpened);
  };
  const pwModalRef = useRef<HTMLElement>(null);

  const handleMoviePublishing = (id: number, data: { password: string }) => {
    mutationRequestCSR('DELETE', `/admin/users/${id}`, data );
  };
  const handleMovieDeletion = (id: number, data: { password: string }) => {
    mutationRequestCSR('DELETE', `/admin/movies/${id}`, data );
  };
  const handleUserDeletion = (id: number, data: { password: string }) => {
    mutationRequestCSR('DELETE', `/admin/users/${id}`, data );
  };
  const handleSubmitActions = [
    { actionType: 'PUBLISHMOVIE', description: 'publication du film', handlingFunction: handleMoviePublishing },
    { actionType: 'DELETEMOVIE', description: 'suppression du film', handlingFunction: handleMovieDeletion },
    { actionType: 'DELETEUSER', description: 'suppression de l\'utilisateur', handlingFunction: handleUserDeletion },
  ];

  return (
    <>
      <main>
        <h1 className="custom-container items-start hero-text">Administration</h1>
        {
          !isAdmin 
            ? <p className='custom-container'>Cette section est réservée aux admins.</p>
            : (
              <>
                <PropositionsSection propositions={propositions} error={propositionsError} />
                <UsersSection users={users} error={usersError}/>
              </>
            )
        }
      </main>
      {
        isConfirmationModalOpened && (
          <Modal 
            stateValue={isConfirmationModalOpened}
            setter={() => setIsConfirmationModalOpened(!isConfirmationModalOpened)}
            ref={pwModalRef}>
            <form action="submit"></form>
          </Modal>
        )
      }
    </>
  );
};
export default Administration;
