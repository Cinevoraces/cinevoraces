interface RangeCommonProps {
  label?: string;
  id: string;
  min: number;
  max: number;
}

interface RangeProps extends RangeCommonProps {
  value: number;
  setter: (value: string)=>void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\>
 * @param id            set id param content
 * @param min           set range minimal value
 * @param max           set range maximal value
 * @param stateValue    controlled state
 * @param setter        state setter
 */
const Range = (props: RangeProps) => {
  const { label, setter, ...inputProps } = props;
  const { id, value } = inputProps;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((e.currentTarget.value));
  };

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <div className="mt-1 flex justify-between items-center gap-3">
        <p className="min-w-[4rem]">{value + ' min'}</p>
        <input
          type="range"
          {...inputProps}
          onChange={handleOnChange}
        />
      </div>
    </fieldset>
  );
};

interface DoubleRangeProps extends RangeCommonProps {
  minValue: number;
  maxValue: number;
  minSetter: (value: string)=>void;
  maxSetter: (value: string)=>void;
}

/**
 * @return              \<input\> type range
 * @param label         set \<label\> content
 * @param id            set id param content
 * @param min           set range minimal value
 * @param max           set range maximal value
 * @param minValue      controlled state 1
 * @param maxValue      controlled state 2
 * @param minSetter     state setter 1
 * @param maxSetter     state setter 2
 */
const DoubleRange = (props: DoubleRangeProps) => {
  const { label, minSetter, maxSetter, minValue, maxValue, ...inputProps } = props;
  const { id } = inputProps;
  const minHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    minSetter(e.currentTarget.value);
  };
  const maxHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    maxSetter(e.currentTarget.value);
  };

  return (
    <fieldset className="w-full px-auto">
      <label htmlFor={id}>{label}</label>
      <div className="mt-1 flex justify-between items-center gap-4">
        <p className="block w-[16%]">{minValue}</p>
        <div className="relative w-[68%] -mt-2">
          <input
            type="range"
            {...inputProps}
            value={minValue}
            onChange={minHandleOnChange}
            className="absolute"
          />
          <input
            type="range"
            {...inputProps}
            value={maxValue}
            onChange={maxHandleOnChange}
            className="absolute"
          />
        </div>
        <p className="block w-[16%] text-right">{maxValue}</p>
      </div>
    </fieldset>
  );
};

export { Range, DoubleRange };
