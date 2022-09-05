import { motion } from 'framer-motion';
import { useState } from 'react';
import { ReactComponent as SvgArrowRight } from './FilterMenu.arrowRight.svg';
import { ReactComponent as SvgArrowDown } from './FilterMenu.arrowDown.svg';
import styles from './FilterMenu.module.scss';

type DropDownProps = {
  children: React.ReactNode,
  handleClose(event: React.MouseEvent<HTMLDivElement>): void,
}

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.1
}; 
const variants  = {
  hidden: {scale: 0, transition},
  show:   {scale: 1, transition},
};

/**
 * @returns             Filter wrapper menu
 * @param handleClose   Closing setter
 */
function FilterMenu ({children, handleClose}: DropDownProps) {
  return(
    <>
      <div className={styles['filter-menu-back']} onClick={handleClose}/>
      <motion.div 
        variants={variants}
        initial='hidden'
        animate='show'
        className={styles['filter-menu']}
      >
        {children}
      </motion.div>
    </>
  );
}

/**
 * @returns     Drop-down menu for filter category
 * @param name  Displayed category name
 */
function DropDown ({children, name} : {[key: string]: React.ReactNode}) {
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  return(
    <>
      <div onClick={handleDropDown} className={styles['filter-name']}>
        <span>{name}</span>
        {!dropDown && <SvgArrowRight/>}
        {dropDown && <SvgArrowDown/>}
      </div>
      {dropDown &&
        <ul className={styles.list}>
          {children}
        </ul>}
    </>
  );
}

export {FilterMenu, DropDown};