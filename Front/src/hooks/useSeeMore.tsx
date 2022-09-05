import { useState } from 'react';
import styles from './useSeeMore.module.scss';

/**
 * @returns     Slice text and add 'Voir plus'/'Voir moins' action
 * @param text  Text content
 * @param max   Max character alowed
 */
function useSeeMore(text: string, max: number = 500) {
  const [maxChar, setMaxChar] = useState(max);
  const [see, setSee] = useState('Voir plus');
  if (!text) return null;
  const textLenght = text.length;
  const seeMore = () => {
    if (maxChar <= max) {
      setMaxChar(textLenght);
      setSee('Voir moins');
    }
    else {
      setMaxChar(max);
      setSee('Voir plus');
    }};

  if (textLenght <= max) {
    return <p className={styles.text}>{text}</p>;
  }
  return (
    <p className={styles.text}>{text.substring(0,maxChar)}
      <button onClick={() => {seeMore();}} className={styles.more}>{see}</button>
    </p>
  );
}

export default useSeeMore;