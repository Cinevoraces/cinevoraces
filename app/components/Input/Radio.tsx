import React from 'react';

interface RadioProps {
  style?: string;
  label?: string;
  name: string;
  value: string | number;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * @return              \<input\> type checkbox
 * @param style         set custom style for misc applications
 * @param label         set \<label\> content
 * @param name          set 'name' param
 * @param value         set 'value' and 'id' params
 * @param isChecked     define if default checked
 * @param handler       state setter
 */
export default function Radio(props: RadioProps) {
  const { style, label, ...nativeProps } = props;
  const name = nativeProps.name;
  const basicLabelStyle = 'relative flex justify-between items-center text-lg font-thin hover:text-orange-primary';
  const basicInputStyle =`w-5 h-5 border border-transparent rounded-full 
    bg-orange-primary/20 text-orange-secondary
    focus:border-orange-primary focus:ring-4 focus:ring-offset-0 focus:ring-white/5
    hover:border-orange-primary hover:ring-4 hover:ring-offset-0 hover:ring-white/5 `;
  const selectLabelStyle = 'px-5 relative hover:text-orange-primary focus-within:text-orange-primary';
  const selectInputStyle = `absolute inset-0 w-full h-5
  opacity-0`;

  const defineStyle = (style?: string): { label: string;input: string; } => {
    return (style) ?
      { label: selectLabelStyle, input: selectInputStyle }
      : { label: basicLabelStyle, input: basicInputStyle };
  };

  const styles = defineStyle(style);

  return (
    <label
      htmlFor={name}
      className={styles.label}>
      {label}
      <input
        type="radio"
        {...nativeProps}
        className={styles.input}
      />
    </label>
  );
}
