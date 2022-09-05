import styles from './InputCheckbox.module.scss';

interface InputCheckboxProps extends filter {
  handler: React.ChangeEventHandler<HTMLInputElement>,
}

/**
 * @return              \<input\> type checkbox
 * @param name          set 'value' and 'id' param and \<label\> content
 * @param isChecked     define if default checked 
 * @param handler       state setter
 */
function InputCheckbox({name, isChecked, handler}: InputCheckboxProps) {
  return(
    <div className={styles['input-checkbox']}>
      <label className={styles.label} htmlFor={name}>
        {name}
      </label>
      <input 
        className={styles.input}
        type='checkbox'
        value={name}
        id={name}
        onChange={handler}
        defaultChecked={isChecked}
      />
    </div>
  );
}

export default InputCheckbox;