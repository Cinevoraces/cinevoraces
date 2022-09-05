import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode
};

/**
 * @returns App layout 
 */
function Layout({children}: LayoutProps) {
  return(
    <>
      <Header/>
      {children}
    </>
  );
}

export default Layout;