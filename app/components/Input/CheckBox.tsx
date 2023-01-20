interface CheckBoxProps {
  customStyle?: 'filter';
  label?: string;
  name: string;
  id: string;
  value?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @param customStyle       custom style for label - checkbox flex-justify
 * @param label             set \<label\> param
 * @param name              set 'name' param
 * @param id                set 'id' param content
 * @param value             set value param
 * @param checked           set 'checked' boolean value
 * @param onChange          state setter
 * @return                  \<input\> type checkbox
 */
const CheckBox = (props: CheckBoxProps) => {
  const labelBasicStyle = 'flex flex-row-reverse justify-end gap-4 items-top';
  const { customStyle, ...checkboxProps } = props;
  const name = checkboxProps.name;
  return (
    <div className={!customStyle ? labelBasicStyle : labelBasicStyle + ' w-full'}>
      <label
        htmlFor={name}
        className="text-sm font-light cursor-pointer">
        {name}
      </label>
      <input
        type="checkbox"
        {...checkboxProps}
        className="relative w-5 h-5 
        cursor-pointer 
        border border-transparent rounded 
        bg-orange-primary/20 text-orange-secondary 
        focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5 
        hover:border-orange-primary hover:ring-4 hover:ring-offset-0 hover:ring-white/5 "
      />
    </div>
  );
};

export default CheckBox;
