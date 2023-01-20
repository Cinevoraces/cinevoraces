import { forwardRef } from 'react';
import styles from './inputStyles';
import type { BaseTextProps } from '@custom_types/textInputs';

/**
 * @return                   \<input\> type text/mail/psw/search
 * @param type               set \<input\> 'type' (email | password | search) - default text
 * @param label              add a \<label\> on top of \<input\>
 * @param id                 set \<input\> id and name params
 * @param placeholder        set \<input\> 'placeholder' param
 * @param required           set \<input\> 'required' param
 * @param pattern            set \<input\> 'pattern' param
 * @param minLength          set \<input\> 'minlength' param
 * @param errorMessage       set the error feedback message
 */
export const RefTextInput = forwardRef<HTMLInputElement, BaseTextProps<HTMLInputElement>>((props, ref) => {
  RefTextInput.displayName = 'RefTextInput';
  const { errorMessage, required, ...inputProps } = props;
  const { label, id } = inputProps;
  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        name={id}
        className={styles.standardStyle}
        ref={ref}
        // using the setCustomValidity() method needs a clearance, only possible here...
        onInput={() => {
          if (ref && typeof ref !== 'function' && ref.current) ref.current.setCustomValidity('');
        }}
      />
      <p className="hidden peer-invalid:block text-sm font-light text-red-500">{errorMessage}</p>
    </div>
  );
});

export default RefTextInput;
