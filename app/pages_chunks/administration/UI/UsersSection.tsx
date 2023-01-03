// import type { Users } from '@custom_types/index';
import type { SWRResponse } from 'swr';
import type { NextPage } from 'next';
import dateFormater from '@utils/dateFormater';
import { Roles } from '@custom_types/global';
import { Button } from '@components/Input';

interface UsersSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error;

}

const userTableColumns = ['Id', 'Pseudo', 'Mail', 'Rôle', 'Date d\'inscription', 'Modification'];
const cellStyle = 'px-4 py-2';

const UsersSection: NextPage<UsersSectionProps> = ({ users, error }) => {
  return (
    <section className="custom-container pt-4">
      <h2 className='title-section w-full'>Membres</h2>
      {
        error
          ? <p>{error.message}</p>
          : (users && users.length > 0)
            ? ( 
              <table className='table-auto rounded-lg overflow-hidden'>
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
                        <td className={cellStyle + ' flex gap-4'}>
                          <Button customStyle='rounded' disabled>Passer admin</Button>
                          <Button customStyle='rounded'>Supprimer</Button>
                        </td>
                      </tr>))
                  }
                </tbody>
              </table>
            )
            : <p>La liste des membres</p>
      }
    </section>
  );
};
export default UsersSection;
