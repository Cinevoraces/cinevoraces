import React from 'react';

interface TextProps {
  type?: 'email' | 'password' | 'search' | 'textarea';
  label?: string;
  id: string;
  placeholder?: string;
  value?: string;
  handler?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type text/mail/psw/search
 * @param type          set \<input\> 'type' (email | password | search) - default text
 * @param label         add a \<label\> on top of \<input\>
 * @param id            set \<input\> id and name params
 * @param placeholder   set \<input\> 'placeholder' param
 * @param value         controlled state
 * @param handler       state setter
 */
export default function Text(props: TextProps) {
  const { type, id, label } = props;
  const basicStyles = `rounded-full rounded-md bg-medium-gray border border-transparent
  px-3 py-2
  placeholder:font-extralight placeholder:text-gray-400
  focus:outline-none focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
  focus:placeholder:text-gray-600`;

  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={id}>
        {label}
      </label>
      {type !== 'textarea' && (
        <input
          {...props}
          name={id}
          className={basicStyles}
        />
      )}
    </div>
  );
}
