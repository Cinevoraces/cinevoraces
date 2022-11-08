import React from 'react';

interface CheckBoxProps {
  style?: 'filter';
  name: string;
  value: string;
  isChecked?: boolean;
  handler?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type checkbox
 * @param style         custom style for label - checkbox flex-justify
 * @param name          set \<label\> and 'id' param content
 * @param value         set 'value' content
 * @param isChecked     define if default checked
 * @param handler       state setter
 */
export default function CheckBox({
  style,
  name,
  value,
  isChecked,
  handler,
}: CheckBoxProps) {
  const labelBasicStyle = 'flex gap-6 items-center';
  return (
    <div
      className={!style ? labelBasicStyle : labelBasicStyle + ' ' + 'w-full justify-between'}>
      <label
        htmlFor={name}
        className="text-lg font-thin">
        {name}
      </label>
      <input
        type="checkbox"
        value={value}
        id={name}
        onChange={handler}
        defaultChecked={isChecked ? true : false}
        className="w-5 h-5 border border-transparent rounded 
        bg-orange-primary/20 text-orange-secondary
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5"
      />
    </div>
  );
}
