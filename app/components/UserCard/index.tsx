import Avatar from '@components/Avatar';
import dateFormater from '@utils/dateFormater';
import { useAppSelector } from '@store/store';
import { user as userSlice } from '@store/slices/user';

import type { User } from 'models/custom_types/index';
import { Roles } from 'models/enums';

interface UserCardProps {
  user: User;
  type?: 'personal' | 'admin';
  children?: React.ReactNode;
}

/**
 * 
 * @param user 
 * @param type 
 * @param children 
 * @returns <div> wrapper for a user tile that can be filled with extra elements
 */
const UserCard = ({ user, type, children }: UserCardProps) => {
  // Retrieving user slice state for personnal avatar use
  const avatarUrl = useAppSelector(userSlice).avatarUrl;
  return (
    <div
      id="user-card"
      className="w-full flex flex-col px-6 py-4 gap-3 items-center rounded-xl bg-medium-gray max-w-lg">
      <div className="flex gap-2">
        <Avatar
          id={user.id}
          pseudo={user.pseudo}
          interactive={false}
          avatarUrl={type ? avatarUrl : undefined}
        />
        <h2 className="title-section">{user.pseudo}</h2>
      </div>
      <p className="emphasis">
        {user.role === Roles.USER ? 'Membre' : user.role === Roles.MODERATOR ? 'Modo' : 'Admin'}
      </p>
      {
        type && <p>{user.mail}</p>
      }
      <p>Inscrit•e depuis le {dateFormater(user.created_at)}</p>
      {
        children
      }
    </div>
  );
};

export default UserCard;
