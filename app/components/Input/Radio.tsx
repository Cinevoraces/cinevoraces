import React from 'react';

interface RadioProps {
  label?: string;
  id: string;
  value: string;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type checkbox
 * @param label          set \<label\> content
 * @param id          set 'value' and 'id' param and \<label\> content
 * @param value         set 'value' and 'id' param and \<label\> content
 * @param isChecked     define if default checked
 * @param handler       state setter
 */
export default function Radio(props: RadioProps) {
  const { id, label } = props;
  return (
    <label
      htmlFor={id}
      className="flex gap-3 items-center text-lg font-thin">
      {label}
      <input
        type="radio"
        {...props}
        className="w-5 h-5 border border-transparent rounded-full
        bg-orange-primary/20 text-orange-secondary
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
        hover:border-orange-primary hover:ring-4 hover:ring-offset-0 hover:ring-white/5"
      />
    </label>
  );
}
