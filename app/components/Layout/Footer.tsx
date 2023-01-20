import Link from 'next/link';
import CompleteLogo from './CompleteLogo';

const Footer = () => {
  return (
    <footer className='bg-medium-gray'>
      <div className='container mx-auto mb-0 px-4 py-4 flex flex-col items-center justify-between gap-3'>
        <CompleteLogo />
        <nav className='text-sm font-semibold text-orange-primary lg:text-md'>
          <Link href={'/apropos'}>À propos de Cinévoraces</Link>
        </nav>
        <p className='text-xs lg:text-sm'>© Tous droits réservés - 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
