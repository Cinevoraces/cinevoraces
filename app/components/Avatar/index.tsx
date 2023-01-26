import Image from 'next/image';
import Link from 'next/link';
import defaultUserPic from '@public/icons/user_default.svg';

interface AvatarProps {
  url: string;
  id: number;
  pseudo: string;
}

const className = `w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px]
focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5 focus:scale-110 focus:border-2
hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5 hover:scale-110 hover:border-2
transition duration-150 hover:ease-out`;

/**
 * 
 * @param url
 * @param id
 * @param pseudo
 * @returns <Link> encapsulating the avatar picture of the concerned user
 */
const Avatar = ({ url, id, pseudo }: AvatarProps) => {
  return (
    <Link href={`/membres/${id}`}>
      <Image
        src={url ? url : defaultUserPic}
        alt={`avatar de ${pseudo}`}
        height={50}
        width={50}
        className={className}
      />
    </Link>
  );
};

export default Avatar;
