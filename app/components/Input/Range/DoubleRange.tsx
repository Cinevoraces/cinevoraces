import { useRef, useLayoutEffect } from 'react';
import type { DoubleRangeProps } from '@custom_types/range';

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
  const { id, min, max } = inputProps;
  const minHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    minSetter(e.currentTarget.value);
  };
  const maxHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    maxSetter(e.currentTarget.value);
  };

  const progressBar = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (progressBar.current) {
      progressBar.current.style.left = Math.floor(((minValue - min) / (max - min)) * 100) + '%';
      progressBar.current.style.width = `calc(${Math.floor(((maxValue - minValue) / (max - min)) * 100) + '%'} - 6px)`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, maxValue]);

  return (
    <fieldset className="w-full px-auto">
      <label htmlFor={id}>{label}</label>
      <div className="mt-1 flex justify-between items-center gap-4">
        <p className="block w-[16%]">{minValue}</p>
        <div className="double_range relative w-[68%] -mt-2">
          <input
            type="range"
            {...inputProps}
            value={minValue}
            onChange={minHandleOnChange}
          />
          <input
            type="range"
            {...inputProps}
            value={maxValue}
            onChange={maxHandleOnChange}
          />
          <div
            id="double_range_track"
            className="absolute w-full px-2 h-2 rounded-full bg-orange-primary/20"/>
          <div
            id="double_range_inner"
            className="absolute w-full px-2 h-2 rounded-full bg-orange-secondary"
            ref={progressBar}/>
        </div>
        <p className="block w-[16%] text-right">{maxValue}</p>
      </div>
    </fieldset>
  );
};

export default DoubleRange;
