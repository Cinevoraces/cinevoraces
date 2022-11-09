import React from 'react';

interface CheckBoxProps {
  customStyle?: 'filter';
  label: string;
  id: string;
  value: string;
  defaultChecked?: boolean;
  handler?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type checkbox
 * @param customStyle         custom style for label - checkbox flex-justify
 * @param label          set \<label\> content
 * @param id          set 'id' param content
 * @param value         set 'value' content
 * @param defaultChecked     define if default checked
 * @param handler       state setter
 */
export default function CheckBox(props: CheckBoxProps) {
  const labelBasicStyle = 'flex gap-6 items-center';
  const { customStyle, id, label } = props;
  return (
    <div
      className={!customStyle ? labelBasicStyle : labelBasicStyle + ' ' + 'w-full justify-between'}>
      <label
        htmlFor={id}
        className="text-lg font-thin">
        {label}
      </label>
      <input
        type="checkbox"
        {...props}
        className="w-5 h-5 border border-transparent rounded 
        bg-orange-primary/20 text-orange-secondary
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5"
      />
    </div>
  );
}
