import React from 'react';

interface CheckBoxProps {
  customStyle?: 'filter';
  label: string;
  id: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return                  \<input\> type checkbox
 * @param customStyle       custom style for label - checkbox flex-justify
 * @param label             set \<label\> content
 * @param id                set 'id' and 'name' param content
 * @param checked           set 'checked' boolean value
 * @param onChange          state setter
 */
export const CheckBox = (props: CheckBoxProps) => {
  const labelBasicStyle = 'flex gap-6 items-center';
  const { customStyle, id, label } = props;
  return (
    <div className={!customStyle ? labelBasicStyle : labelBasicStyle + ' ' + 'w-full justify-between'}>
      <label
        htmlFor={id}
        className="text-lg font-thin">
        {label}
      </label>
      <input
        type="checkbox"
        name={id}
        {...props}
        className="w-5 h-5 border border-transparent rounded 
        bg-orange-primary/20 text-orange-secondary
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
        hover:border-orange-primary hover:ring-4 hover:ring-offset-0 hover:ring-white/5"
      />
    </div>
  );
};
/**
 * @return                   \<input\> type checkbox
 * @param label              set \<label\> content
 * @param id                 set 'id' and 'name' param content
 * @param checked            set 'checked' boolean value
 * @param onChange           state setter
 */
export const Toggle = (props: CheckBoxProps) => {
  const { id, label } = props;
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center mr-5 cursor-pointer text-sm font-light">
      <input
        type="checkbox"
        name={id}
        {...props}
        className="sr-only peer"
      />
      <div
        className="relative peer w-11 h-6 bg-orange-primary/20 rounded-full border border-transparent
          after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5  after:bg-medium-gray after:border-gray-300
          peer-focus:border-orange-primary peer-focus:ring-4 peer-focus:ring-offset-0 peer-focus:ring-white/5
          peer-hover:border-orange-primary peer-hover:ring-4 peer-hover:ring-offset-0 peer-hover:ring-white/5
          peer-checked:bg-orange-secondary peer-checked:after:bg-white peer-checked:after:border-white
          peer-checked:after:translate-x-full
          after:transition-all"
      />
      <span className="peer ml-2 peer-hover:text-orange-primary">{label}</span>
    </label>
  );
};
