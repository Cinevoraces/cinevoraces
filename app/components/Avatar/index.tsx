import Image from 'next/image';
import Link from 'next/link';
import defaultUserPic from '@public/icons/user_default.svg';
import { useState } from 'react';

interface AvatarProps {
  id: number;
  pseudo: string;
  interactive?: boolean;
}

const baseStyle = 'w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px]';
const animationStyle = ` focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-white/5 focus:scale-110 focus:border-2
hover:outline-none hover:ring-4 hover:ring-offset-0 hover:ring-white/5 hover:scale-110 hover:border-2
transition duration-150 hover:ease-out`;

/**
 * 
 * @param id
 * @param pseudo
 * @param interactive facultative to use it as link
 * @returns <Link> encapsulating the avatar picture of the concerned user
 */
const Avatar = ({ id, pseudo, interactive }: AvatarProps) => {
  // Trick the browser to consider the latest version of the avatar
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL_SSR}/public/avatar/${id}`;
  const [source, setSource] = useState(url);
  return (
    <>
      { 
        interactive
          ? (<Link href={`/membres/${id}`}>
            <Image
              src={source}
              alt={pseudo === 'me' ? 'mon avatar' : `avatar de ${pseudo}`}
              height={50}
              width={50}
              className={baseStyle + animationStyle}
              priority
              onError={() => setSource(defaultUserPic)}
            />
          </Link>)
          : (<Image
            src={source + `?${Date.now().toString()}`} // Specific treatment to handle avatar modification
            alt={pseudo === 'me' ? 'mon avatar' : `avatar de ${pseudo}`}
            height={50}
            width={50}
            className={baseStyle}
            priority
            onError={() => setSource(defaultUserPic)}
          />)
      }
    </>
  );
};

export default Avatar;
