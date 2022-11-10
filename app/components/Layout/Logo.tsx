import React from 'react';
import Image from 'next/image';
import RawLogo from '@public/icons/logo_complete.svg';

export default function Logo() {
  return (
    <Image 
      src={RawLogo}
      alt="Home Logo"
      width={250}
      height={53.8}/>
  );
}
