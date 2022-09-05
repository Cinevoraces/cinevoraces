import { motion } from 'framer-motion';

type AnimationLayoutProps = {
  children: React.ReactNode
}

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2
}; 
const variants = {
  hidden: {opacity: 0, transition},
  show:   {opacity: 1, transition},
};

/**
 * @returns Framer-motion animation wrapper
 */
function AnimationLayout({children}: AnimationLayoutProps) {
  // Outlet/location method no longer work in React-router-dom v6
  // You need to wrap every page you want to animate with this component
  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      {children}
    </motion.div>
  );
};

export default AnimationLayout;