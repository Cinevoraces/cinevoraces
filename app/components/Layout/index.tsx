import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { global, toggleBurgerMenu, toggleUserMenu, toggleConnectionModal, toggleArePWVisible } from '@store/slices/global';
interface LayoutProps {
  children: React.ReactNode;
}
/**
 * 
 * @param children ReactNodes 
 * @returns global <div> layout component to wrap every common part of it and the toaster mechanic.
 */
const Layout = ({ children }: LayoutProps) => {
  // Page redirection closes opened menus and reset PW visibility
  const dispatch = useAppDispatch();
  const path = useRouter().asPath;
  const { isBurgerMenuOpen, isUserMenuOpen, isConnectionModalOpen, arePWVisible } = useAppSelector(global);
  useEffect(() => {
    if (isBurgerMenuOpen) dispatch(toggleBurgerMenu());
    if (isUserMenuOpen) dispatch(toggleUserMenu());
    if (isConnectionModalOpen) dispatch(toggleConnectionModal());
    if (arePWVisible) dispatch(toggleArePWVisible());
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
};

export default Layout;
