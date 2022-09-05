import styles from './InputRadio.module.scss';

interface InputRadioProps extends filter {
  handler: React.ChangeEventHandler<HTMLInputElement>,
  field: string
}

/**
 * @return              \<input\> type radio
 * @param name          set \<label\> content
 * @param isChecked     define if default checked
 * @param value         controlled state
 * @param handler       state setter
 * @param field         set \<input\> 'name' param
 */
function InputRadio({name, value, isChecked, handler, field}: InputRadioProps) {
  return(
    <label className={styles['input-radio']}>
      {name}
      <input
        className={styles.input}
        type='radio'
        value={value}
        name={field}
        onChange={handler}
        defaultChecked={isChecked}
      />
    </label>
  );
}

export default InputRadio;