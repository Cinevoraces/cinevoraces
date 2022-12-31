import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { globals, toggleBurgerMenu, toggleUserMenu, toggleConnectionModal } from '@store/slices/global';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Page redirection closes misc opened menus
  const dispatch = useAppDispatch();
  const path = useRouter().asPath;
  const { isBurgerMenuOpen, isUserMenuOpen, isConnectionModalOpen } = useAppSelector(globals);
  useEffect(() => {
    if (isBurgerMenuOpen) dispatch(toggleBurgerMenu());
    if (isUserMenuOpen) dispatch(toggleUserMenu());
    if (isConnectionModalOpen) dispatch(toggleConnectionModal());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return (
    <div className='flex flex-col min-h-screen'>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#393945',
            color: '#F2F2F3',
          },
        }}/>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
