interface ToggleProps {
  customStyle?: 'filter';
  label?: string;
  name: string;
  id: string;
  value?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return                   \<input\> type checkbox
 * @param label              set \<label\> content
 * @param name               set 'name' param
 * @param id                 set 'id' and 'name' param content
 * @param checked            set 'checked' boolean value
 * @param onChange           state setter
 */
const Toggle = (props: ToggleProps) => {
  const { id, label } = props;
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center mr-5 cursor-pointer text-sm font-light">
      <input
        type="checkbox"
        {...props}
        className="sr-only peer"
      />
      <div
        className="relative peer w-11 h-6 bg-orange-primary/20 rounded-full border border-transparent
          after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5  after:bg-medium-gray after:border-gray-300
          peer-focus:border-orange-primary peer-focus:ring-4 peer-focus:ring-offset-0 peer-focus:ring-white/5
          peer-hover:border-orange-primary peer-hover:ring-4 peer-hover:ring-offset-0 peer-hover:ring-white/5
          peer-checked:bg-orange-secondary peer-checked:after:bg-light-gray peer-checked:after:border-white
          peer-checked:after:translate-x-full
          after:transition-all"
      />
      <span className="peer ml-2 peer-hover:text-orange-primary">{label}</span>
    </label>
  );
};

export default Toggle;
