import Image from 'next/image';
import defaultUserPic from '@public/icons/user_default.svg';

interface AvatarProps {
  url: string;
  pseudo: string;
}

const Avatar = ({ url, pseudo }: AvatarProps) => {
  return (
    <Image
      src={url ? url : defaultUserPic}
      alt={`avatar de ${pseudo}`}
      height={50}
      width={50}
      className="user w-[35px] h-[35px] p-0.5 border border-white rounded-full lg:w-[45px] lg:h-[45px]"
    />
  );
};

export default Avatar;
