import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @returns Reset windows scroll to 0 on url changes 
 */
function ResetScroll() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ResetScroll;