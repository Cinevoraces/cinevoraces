export interface BaseTextProps<T> {
  type?: 'email' | 'password' | 'search' | 'textarea';
  label?: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  errorMessage?: string;
  defaultValue?: string;
  customStyle?: 'searchbar' | 'light'
}

export interface ControlledTextProps<T> extends BaseTextProps<T> {
  value?: string;
  onChange?: React.ChangeEventHandler<T>;
  onInput?: React.ChangeEventHandler<T>;
}
