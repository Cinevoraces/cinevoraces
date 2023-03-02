import Rate from '@components/Rate';
import Avatar from '@components/Avatar';

interface PostCardProps {
  type: 'presentation' | 'comment' | 'form';
  author_id: number;
  author_pseudo: string;
  publishing_date?: string;
  rating?: number;
  created_at?: string;
  children: React.ReactNode;
  backgroundColorStyle?: string;
}

const basicStyle = 'w-full p-3 rounded-xl drop-shadow-sm flex flex-col gap-4 h-fit';
const presentationStyle = basicStyle + ' bg-medium-gray ';
const formStyle = basicStyle + ' bg-card-one';

// Background variables must be declared inside component code and be imported with the component.
// Could a bug due to tailwind compilation procedure
export const backgroundColorStyles = [
  'bg-card-one',
  'bg-card-two',
  'bg-card-three',
  'bg-card-four',
  'bg-card-five',
];

/**
 *
 * @param type
 * @param author_id
 * @param author_pseudo
 * @param publishing_date
 * @param children
 * @param rating
 * @param created_at
 * @returns <div> versatile cards to be used as wrapper for presentation and comments tiles
 */
const PostCard = ({
  type,
  author_id,
  author_pseudo,
  publishing_date,
  children,
  rating,
  created_at,
  backgroundColorStyle,
}: PostCardProps) => {
  return (
    <div
      id={type === 'presentation' ? 'presentation-card' : type === 'comment' ? 'comment-card' : 'comment-form'}
      className={
        type === 'presentation'
          ? presentationStyle
          : type === 'comment'
            ? basicStyle + ` ${backgroundColorStyle ? backgroundColorStyle : ''}`
            : formStyle
      }>
      <div
        className="flex flex-col gap-2 sm:items-center sm:flex-row sm:justify-between"
        id="card-header">
        <div className="flex items-center gap-2">
          <Avatar
            id={author_id}
            pseudo={author_pseudo}
            interactive
          />
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
        {rating && rating !== 0 ? (
          <Rate
            rate={rating}
            type="user"
          />
        ) : (
          false
        )}
      </div>
      {children}
    </div>
  );
};

export default PostCard;
