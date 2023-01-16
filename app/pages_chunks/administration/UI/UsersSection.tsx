// import type { Users } from '@custom_types/index';
import UserCard from '@components/UserCard';
import type { NextPage } from 'next';
import dateFormater from '@utils/dateFormater';
import { Roles } from 'models/custom_types/global';
import { Button } from '@components/Input';
import type { User } from 'models/custom_types/index';
import { AdminActions } from 'models/enums';

interface UsersSectionProps {
  users?: User[];
  error?: Error;
  handleConfirmationModal: (action: AdminActions, id: number)=>void;
}

const userTableColumns = ['Id', 'Pseudo', 'Mail', 'Rôle', 'Date d\'inscription', 'Modification'];
const cellStyle = 'px-4 py-2';

const UsersSection: NextPage<UsersSectionProps> = ({ users, error, handleConfirmationModal }) => {
  // Actions logic
  const handleUserDeletionConfirmation = (id: number) => {
    handleConfirmationModal(AdminActions.DELETEUSER, id);
  };
  return (
    <section className="custom-container pt-4">
      <h2 className='title-section w-full'>Membres</h2>
      {
        error
          ? <p>{error.message}</p>
          : (users && users.length > 0)
            ? ( 
              <>
              
                <div className='grid gap-2 sm:grid-cols-2 lg:hidden'>
                  {
                    users.map((u) => (
                      <UserCard key={u.pseudo} user={u}>
                        <div className='flex flex-col gap-2'>
                          <Button customStyle='rounded' disabled>Passer admin</Button>
                          <Button customStyle='rounded' onClick={() => handleUserDeletionConfirmation(u.id)}>Supprimer</Button>
                        </div>
                      </UserCard>))
                  }
                </div>
                <table className='hidden table-auto rounded-lg overflow-hidden md:block'>
                  <thead className='bg-medium-gray'>
                    <tr className='text-lg'>
                      {
                        userTableColumns.map((c) => (<th key={c} className='px-4 py-2 font-semibold text-start'>{c}</th>))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((u) => (
                        <tr key={u.pseudo} className='even:bg-medium-gray'>
                          <td className={cellStyle}>{u.id}</td>
                          <td className={cellStyle}>{u.pseudo}</td>
                          <td className={cellStyle}>{u.mail}</td>
                          <td className={cellStyle}>{Roles[u.role].toLowerCase()}</td>
                          <td className={cellStyle}>{dateFormater(u.created_at)}</td>
                          <td className={cellStyle + ' flex gap-4 flex-col lg:flex-row'}>
                            <Button customStyle='rounded' disabled>Passer admin</Button>
                            <Button customStyle='rounded' onClick={() => handleUserDeletionConfirmation(u.id)}>Supprimer</Button>
                          </td>
                        </tr>))
                    }
                  </tbody>
                </table>
              </>
            )
            : <p>La liste des membres</p>
      }
    </section>
  );
};
export default UsersSection;
