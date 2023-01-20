import type { ControlledTextProps } from '@custom_types/textInputs';
import styles from './inputStyles';

/**
 * @return                   \<input\> type text/mail/psw/search
 * @param type               set \<input\> 'type' (email | password | search) - default text
 * @param label              add a \<label\> on top of \<input\>
 * @param id                 set \<input\> id and name params
 * @param placeholder        set \<input\> 'placeholder' param
 * @param value              controlled state
 * @param onChange           state setter
 * @param required           set \<input\> 'required' param
 * @param pattern            set \<input\> 'pattern' param
 * @param required           set \<input\> 'required' param
 * @param minLength          set \<input\> 'minlength' param
 * @param errorMessage       set the error feedback message
 * @param customStyle        set an optionnal customStyle for searchbar use
 */
const ControlledTextInput = (props: ControlledTextProps<HTMLInputElement>) => {
  const { errorMessage, customStyle, ...inputProps } = props;
  const { label, id } = inputProps;
  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        name={id}
        className={(customStyle === 'searchbar') ? styles.basicStyle : styles.standardStyle}
      />
      <p className="hidden peer-invalid:block text-sm font-light text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ControlledTextInput;
