import styles from './InputText.module.scss';

type InputTextProps = { 
  label?: string,
  handler?: React.ChangeEventHandler<HTMLInputElement>,
  value?: string,
  name: string,
  placeholder: string,
  type: string,
  defaultValue?: string | number
}

/**
 * @return              \<input\> type text/mail/psw
 * @param label         add a \<label\> on top of \<input\>
 * @param name          set \<input\> 'for' param
 * @param type          set \<input\> 'type' (email | password | confirm | username | search)
 * @param placeholder   set \<input\> 'placeholder' param
 * @param handler       state setter
 * @param value         controlled state
 */
function InputText({label, name, type, placeholder, handler, value}: InputTextProps) {
  // Look for type name to setup correct icon
  const classResolver = (searchedString: string) => {
    if (RegExp(`\\b${searchedString}\\b`).test(type)) {
      return searchedString;
    } else {
      return name;
    }};
  const className = classResolver('password');
  return (
    <div className={styles.container}>
      {label &&
        <label className= {styles.label} htmlFor={name}>
          {label}
        </label>}
      <input 
        className={`${styles.input} ${styles[`input--${className}`]}`} 
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handler}
        value={value}
      />
    </div>
  );
}

export default InputText;