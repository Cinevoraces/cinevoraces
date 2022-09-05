import { useEffect, useState } from 'react';
import styles from './InputStar.module.scss';

type InputStarProps = {
  isInput?: boolean,
  value: number,
  setter?: (arg: number) => void,
}

/**
 * @return            Radio input menu or notation
 * @param   value     controlled state
 * @param   isInput   return \<div> if false
 * @param   setter    setter function (only for input)
 */
function InputStar ({isInput, value, setter}: InputStarProps) {
  // Create radio inputs index
  type starIndex = {value: number, defaultChecked: boolean}[];
  const [starArray, setStarArray] = useState<starIndex>([]);
  useEffect(() => {
    const array: starIndex = [];
    // Invert index order for CSS '~' selector
    for (let i = 5; i !== 0; i--) {
      array.push({value: i, defaultChecked: (value === i) && true});
    }
    setStarArray(array);
  }, [value]);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setter!(Number(e.currentTarget.value));
  };
  return(
    <div className={styles['input-star']}>
      {isInput &&
        // Interactive version
        starArray.map(({value, defaultChecked}) => (
          <input
            className={styles.input}
            type='radio'
            value={value}
            key={value}
            name='input-star'
            onChange={handleOnChange}
            defaultChecked={defaultChecked}
          />))}
      {!isInput &&
        // Fix version
        starArray.map(el => (
          <div 
            key={el.value}
            className={
              (el.value > value) 
                ? styles.star
                : `${styles.star} ${styles['star--checked']}`
            }/>))}
    </div>
  );
}

export default InputStar;