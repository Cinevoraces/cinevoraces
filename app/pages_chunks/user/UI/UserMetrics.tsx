import type { User } from 'models/custom_types/index';

const metrics = [
  { name: 'propositions_count', title: 'proposé', color: ' text-orange-primary' },
  { name: 'watchlist_count', title: 'listé', color: ' text-orange-secondary' },
  { name: 'likes_count', title: 'aimé', color: ' text-purple' },
  { name: 'ratings_count', title: 'noté', color: ' text-green' },
  { name: 'comments_count', title: 'commenté', color: ' text-yellow' },
];

interface UserMetricsProps extends User{};

const UserMetrics = ({ ...user }: UserMetricsProps) => {
  return (
    <div className='w-full flex flex-col gap-8'>
      <h2 className='title-section text-center'>{'Récapitulatif de l\'activité :'}</h2>
      <div className='grid grid-cols-2 gap-2 text-center text-lg font-semibold lg:grid-cols-3 xl:grid-cols-5'>
        { // user can't be undefined due to safe guard on member page
          (metrics)
            .map((m) => (
              <p key={m.name} className={'flex flex-col items-center' + m.color}>
                <span className='text-3xl'>
                  {user.metrics![m.name]}
                </span>
                {`Film${(user.metrics![m.name] > 1) ? 's ' : ' '}${m.title}${(user.metrics![m.name] > 1) ? 's' : ''}`}
              </p>
            ))
        }
      </div>
    </div>
  );
};

export default UserMetrics;
