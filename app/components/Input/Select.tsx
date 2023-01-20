import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import { Button, RadioInput } from '@components/Input';
import useCloseMenuOnOutsideClick from '@hooks/useCloseMenuOnOutsideClick';
import useCloseMenuOnEnterKeyPress from '@hooks/useCloseOnEnterPress';
import { ArrowSvg } from '@components/SvgComponents';
export interface OptionProps {
  name: string;
  value: string;
}
export interface SelectProps {
  name: string;
  options: OptionProps[];
  displayOptionsState: boolean;
  displayOptionsSetter: ()=>void;
  stateValue: OptionProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueSetter: Dispatch<SetStateAction<OptionProps>> | ((option: OptionProps)=>{ payload: OptionProps; type: string; });
  selectCustomStyle?: 'searchbar';
}

const Select = (props: SelectProps) => {
  const { name, options, displayOptionsState, displayOptionsSetter, stateValue, valueSetter, selectCustomStyle } = props;
  const toggleSelectDisplay = () => displayOptionsSetter();
  const selectRef = useRef<HTMLDivElement>(null);
  useCloseMenuOnOutsideClick(selectRef, name, displayOptionsState, displayOptionsSetter);
  useCloseMenuOnEnterKeyPress(displayOptionsState, displayOptionsSetter);

  return (
    <div
      id="select-input"
      className={name + ' relative flex flex-col gap-2 items-center'}
      ref={selectRef}>
      {!selectCustomStyle ? (
        <Button
          customStyle="select"
          onClick={toggleSelectDisplay}
          name={name}>
          <div className="w-full flex justify-between items-center">
            {stateValue.name}
            <ArrowSvg style="stroke-orange-primary fill-orange-primary" />
          </div>
        </Button>
      ) : (
        <button
          className={
            name +
            ' min-w-[150px] h-full px-3 rounded-xl bg-medium-gray shadow-inner focus:outline-none focus:text-orange-primary'
          }
          onClick={toggleSelectDisplay}
          name={name}>
          <div className="w-full flex justify-between items-center">
            <p className="text-sm">{stateValue.name}</p>
            <ArrowSvg style="stroke-orange-primary fill-orange-primary" />
          </div>
        </button>
      )}
      {displayOptionsState && (
        <fieldset
          className={
            name +
            ` absolute z-20 top-12 w-full -ml-1 
              text-sm 
              py-2.5 flex flex-col gap-2 border rounded-xl 
              bg-medium-gray border-orange-primary`
          }>
          {options.map((o) => (
            <RadioInput
              style="select"
              key={o.name}
              label={o.name}
              name="season"
              value={o.value}
              onChange={() => valueSetter(o)}
            />
          ))}
        </fieldset>
      )}
    </div>
  );
};

export default Select;
