import styles from './inputStyles';
import type { ControlledTextProps } from '@custom_types/textInputs';

/**
 * @return                   \<textarea\>
 * @param label              add a \<label\> on top of \<input\>
 * @param id                 set \<input\> id and name params
 * @param placeholder        set \<input\> 'placeholder' param
 * @param value              controlled state
 * @param onChange           state setter
 * @param required           set \<input\> 'required' param
 * @param minLength          set \<input\> 'minlength' param
 * @param errorMessage       set \<input\> 'pattern' param
 */
const ControlledTextArea = (props: ControlledTextProps<HTMLTextAreaElement>) => {
  const { errorMessage, ...inputProps } = props;
  const { label, id } = inputProps;

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...inputProps}
        name={id}
        className={styles.standardStyle.replace('bg-medium-gray', 'bg-dark-gray')}
      />
      <p className="hidden peer-invalid:block text-sm font-light text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ControlledTextArea;
