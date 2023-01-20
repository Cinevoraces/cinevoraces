import { forwardRef } from 'react';
import styles from './inputStyles';
import type { BaseTextProps } from '@custom_types/textInputs';

/**
 * @return                   \<textarea\>
 * @param label              add a \<label\> on top of \<input\>
 * @param id                 set \<input\> id and name params
 * @param placeholder        set \<input\> 'placeholder' param
 * @param required           set \<input\> 'required' param
 * @param minLength          set \<input\> 'minlength' param
 * @param errorMessage       set \<input\> 'pattern' param
 * @param defaultValue       set \<input\> 'defaultValue' param
 * @param customStyle        set background colot for contrast purposes
 */
const RefTextArea = forwardRef<HTMLTextAreaElement, BaseTextProps<HTMLTextAreaElement>>((props, ref) => {
  RefTextArea.displayName = 'RefTextArea';
  const { errorMessage, customStyle, ...inputProps } = props;
  const { label, id } = inputProps;

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...inputProps}
        name={id}
        rows={15}
        className={(customStyle === 'light') ? styles.standardStyle : styles.standardStyle.replace('bg-medium-gray', 'bg-dark-gray')}
        ref={ref}
        onInput={() => {
          if (ref && typeof ref !== 'function' && ref.current) ref.current.setCustomValidity('');
        }}
      />
      <p className="hidden peer-invalid:block text-sm font-light text-red-500">{errorMessage}</p>
    </div>
  );
});

export default RefTextArea;
