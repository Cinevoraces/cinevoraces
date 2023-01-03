import Avatar from '@components/Avatar';
import dateFormater from '@utils/dateFormater';

import type { User } from '@custom_types/index';
import { Roles } from '@custom_types/index';

interface UserCardProps extends User {}

const UserCard = ({ ...user }: UserCardProps) => {
  return (
    <div
      id="user-card"
      className="w-full flex flex-col px-6 py-4 gap-3 items-center rounded-xl bg-medium-gray max-w-lg">
      <div className="flex gap-2">
        <Avatar
          url={user.avatar_url}
          pseudo={user.pseudo}
        />
        <h2 className="title-section">{user.pseudo}</h2>
      </div>
      <p className="emphasis">
        {user.role === Roles.USER ? 'Membre' : user.role === Roles.MODERATOR ? 'Modo' : 'Admin'}
      </p>
      <p>Inscrit•e depuis le {dateFormater(user.created_at)}</p>
    </div>
  );
};

export default UserCard;
