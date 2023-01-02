// import type { Users } from '@custom_types/index';
import type { SWRResponse } from 'swr';

interface UsersSectionProps {
  users: {}[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error;  
}

const UsersSection = ({ users, error }: UsersSectionProps) => {
  return (
    <section className="custom-container py-4">
      <h2 className='title-section w-full'>Membres</h2>
      {
        error
          ? <p>Une erreur est survenue</p>
          : <p>La liste des membres</p>
      }
    </section>
  );
};
export default UsersSection;
