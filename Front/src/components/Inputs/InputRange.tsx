import styles from './InputRange.module.scss';

type InputRangeProps = {
  min: number,
  max: number ,
  stateValue: number,
  setter(value: number): void,
  label: string
}
type DoubleInputRangeProps = {
  min: number,
  max: number ,
  valueMin: number,
  valueMax: number ,
  maxSetter(value: number): void,
  minSetter(value: number): void,
  label: string
}

/**
 * @return              \<input\> type range
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param stateValue    controlled state
 * @param setter        state setter
 * @param label         set \<label\> content and 'id' param
 */
function InputRange({min, max, stateValue, setter, label}: InputRangeProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(event.currentTarget.value));
  };
  return (
    <div className={styles['double-input-range']}>
      <div className={styles['input-container']}>
        <div className={styles['slider--simple']}>
          <input
            id={label}
            type='range'
            min={min}
            max={max}
            value={stateValue}
            onChange={handleOnChange}
          />
        </div>
        <div className={`${styles['value--simple']}`}>{stateValue} min</div>
      </div>
    </div>
  );
};

/**
 * @return              double \<input\> type range
 * @param min           set range minimal value
 * @param max           set range maximal value 
 * @param valueMax      controlled state
 * @param valueMin      controlled state
 * @param maxSetter     state setter
 * @param minSetter     state setter
 * @param label         set \<label\> content and 'id' param
 */
function DoubleInputRange({min, max, valueMin, valueMax, maxSetter, minSetter, label}: DoubleInputRangeProps) {
  const handleMinThumb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.currentTarget.value), valueMax - 1);
    minSetter(value);
  };
  const handleMaxThumb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.currentTarget.value), valueMin + 1);
    maxSetter(value);
  };

  return (
    <div className={styles['double-input-range']}>
      <div className={styles['input-container']}>
        <div className={`${styles['value']}`}>{valueMin}</div>
        <div className={styles['slider']}>
          <input
            id={label}
            type='range'
            min={min}
            max={max}
            value={valueMin}
            onChange={handleMinThumb}
          />
          <input
            id='time'
            type='range'
            min={min}
            max={max}
            value={valueMax}
            onChange={handleMaxThumb}
          />
        </div>
        <div className={`${styles['value']}`}>{valueMax}</div>
      </div>
    </div>
  );
};

export {InputRange, DoubleInputRange};