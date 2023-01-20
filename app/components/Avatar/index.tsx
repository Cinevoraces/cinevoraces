import Image from 'next/image';
import Link from 'next/link';
import defaultUserPic from '@public/icons/user_default.svg';
import { Url } from 'url';

interface AvatarProps {
  url: string;
  id: number;
  pseudo: string;
}

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
        className="user w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px]"
      />
    </Link>
  );
};

export default Avatar;
