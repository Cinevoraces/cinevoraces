import React from 'react';

interface RadioProps {
  style?: string;
  name: string;
  value: string;
  isChecked?: string;
  handler?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type checkbox
 * @param style         custom style
 * @param name          set 'value' and 'id' param and \<label\> content
 * @param value         set 'value' and 'id' param and \<label\> content
 * @param isChecked     define if default checked
 * @param handler       state setter
 */
export default function Radio({ style, name, value, isChecked, handler }: RadioProps) {
  return (
    <label
      htmlFor={name}
      className="flex gap-3 items-center text-lg font-thin">
      {name}
      <input
        type="radio"
        value={value}
        id={name}
        onChange={handler}
        defaultChecked={isChecked ? true : false}
        className="w-5 h-5 border border-transparent rounded-full
        bg-orange-primary/20 text-orange-secondary
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5"
      />
    </label>
  );
}
