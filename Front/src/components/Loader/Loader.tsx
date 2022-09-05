import styles from './Loader.module.scss';

type LoaderProps = {
  isMaxed?: boolean
}

/**
 * @returns       Loading animation
 * @param isMaxed Loader take whole page 
 */
function Loader({isMaxed}: LoaderProps) {
  return(
    <>
      {isMaxed && 
        <div className={styles['lds-container']}>
          <LoadingAnim />
        </div>}
      {!isMaxed && 
        <LoadingAnim />}
    </>
  );
}

function LoadingAnim() {
  return(
    <div className={styles['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;