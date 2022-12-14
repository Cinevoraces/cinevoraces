import Rate from '@components/Rate';
import Avatar from '@components/Avatar';

interface PostCardProps {
  type: 'presentation' | 'comment' | 'form';
  author_avatar: string;
  author_pseudo: string;
  publishing_date?: string;
  rating?: number;
  created_at?: string;
  children: React.ReactNode;
}

const basicStyle = 'w-full p-3 rounded-xl drop-shadow-sm flex flex-col gap-4 h-fit ';
const presentationStyle = basicStyle + 'bg-medium-gray ';
const commentStyle =
  basicStyle +
  'threeModulusZero-child:bg-card-bg-two threeModulusOne-child:bg-card-bg-three threeModulusTwo-child:bg-card-bg-one';
const formStyle = basicStyle + 'bg-card-bg-one';

export default function PostCardProps({
  type,
  author_avatar,
  author_pseudo,
  publishing_date,
  children,
  rating,
  created_at,
}: PostCardProps) {
  return (
    <div
      id={type === 'presentation' ? 'presentation-card' : type === 'comment' ? 'comment-card' : 'comment-form'}
      className={type === 'presentation' ? presentationStyle : type === 'comment' ? commentStyle : formStyle}>
      <div className="flex flex-col gap-2" id="card-header">
        <div
          className="flex items-center gap-2">
          <Avatar url={author_avatar} pseudo={author_pseudo}/>
          <div
            id="post-infos"
            className="flex flex-col justify-between">
            <p className="text-lg font-medium">{author_pseudo}</p>
            <p className="text-xs">
              {publishing_date &&
                new Date(publishing_date.slice(0, 10)).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              {created_at &&
                new Date(created_at.slice(0, 10)).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
            </p>
          </div>
        </div>
        {(rating && rating !== 0) ? <Rate rate={rating} type='user' /> : false}
      </div>
      {children}
    </div>
  );
}
