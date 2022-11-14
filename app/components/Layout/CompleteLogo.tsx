import React from 'react';
import Image from 'next/image';
import RawLogo from '@public/icons/logo_complete.svg';

export default function CompleteLogo() {
  return (
    <Image 
      src={RawLogo}
      alt="Home Logo"
      width={190}
      height={40}
      className="h-[35px] w-auto lg:h-[45px]"/>
  );
}
