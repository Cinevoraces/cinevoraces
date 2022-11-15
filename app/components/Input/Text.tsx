import React from 'react';

interface TextProps<T> {
  type?: 'email' | 'password' | 'search' | 'textarea';
  label?: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<T>;
  onInput?: React.ChangeEventHandler<T>
  required?: boolean;
  pattern?: string;
  minLength?: number;
  errorMessage?: string;
}

const basicStyles = `peer
  rounded-full rounded-md bg-medium-gray border border-transparent
  px-3 py-2
  placeholder:font-extralight placeholder:text-gray-400
  focus:outline-none focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
  focus:placeholder:text-gray-600
  invalid:border-red-500`;

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
 * @param minLength          set \<input\> 'minlength' param
 * @param errorMessage       set the error feedback message
 */
export const Text = (props: TextProps<HTMLInputElement>) => {
  const { errorMessage, ...inputProps } = props;
  const { label, id } = inputProps;

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        name={id}
        className={basicStyles}
      />
      <p className='hidden peer-invalid:block text-sm font-light text-red-500'>{errorMessage}</p>
    </div>
  );
};

/**
 * @return                   \<textarea\>
 * @param label              add a \<label\> on top of \<input\>
 * @param id                 set \<input\> id and name params
 * @param placeholder        set \<input\> 'placeholder' param
 * @param value              controlled state
 * @param onChange           state setter
 * @param errorMessage       set \<input\> 'pattern' param
 */
export const TextArea = (props: TextProps<HTMLTextAreaElement>) => {
  const { errorMessage, ...inputProps } = props;
  const { label, id } = inputProps;

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...inputProps}
        name={id}
        className={basicStyles}
      />
      <p className='hidden peer-invalid:block text-sm font-light text-red-500'>{errorMessage}</p>
    </div>
  );
};
