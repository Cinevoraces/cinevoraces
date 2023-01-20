import { useRef, useLayoutEffect } from 'react';
import type { RangeProps } from '@custom_types/range';

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
  const { id, value, min, max } = inputProps;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.currentTarget.value);
  };

  const progressBar = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (progressBar.current) {
      progressBar.current.style.width = Math.floor(((value - min) / (max - min)) * 100) + '%';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <div className="mt-1 flex justify-between items-center gap-3">
        <p className="min-w-[4rem]">{value + ' min'}</p>
        <div className="range w-full relative">
          <input
            type="range"
            {...inputProps}
            onChange={handleOnChange}
          />
          <div
            id="range_track"
            className="absolute w-full right-0 h-2 rounded-full bg-orange-primary/20"/>
          <div
            id="range_progress"
            className="absolute left-0 w-full px-2 h-2 rounded-full bg-orange-secondary"
            ref={progressBar}/>
        </div>
      </div>
    </fieldset>
  );
};

export default Range;
