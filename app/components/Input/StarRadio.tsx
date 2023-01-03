import type { FormEvent } from 'react';
import { StarSvg } from '../SvgComponents/InteractionsSVG';

interface StarRadioProps {
  onChange: (e: FormEvent)=>void;
  value?: number;
}

export default function StarRadio(props: StarRadioProps) {
  const radioStyle = ` radio-input absolute z-20 cursor-pointer 
  peer w-6 h-6 border-none 
  bg-transparent text-transparent 
  checked:bg-none 
  focus:border-transparent focus:ring-none focus:ring-offset-0 focus:ring-transparent 
  hover:border-orange-primary hover:ring-none 
  `;
  const starStyle = `absolute z-10 fill-dark-gray 
  peer-hover:fill-yellow peer-checked:fill-yellow 
  ease-out duration-300 `;
  const starEffectStyle = `absolute scale-[1.75] -top-[0.5px] fill-transparent 
  peer-hover:fill-white/5 peer-focus:fill-white/5 
  ease-out duration-300`;

  console.log(props);

  return (
    <fieldset
      className="w-52 h-10 flex flex-row-reverse gap-10 "
      {...props}>
      <legend className="sr-only">Note sur 5</legend>
      {[...Array(5)].map((_, i) => (
        <label
          htmlFor="rating"
          className={`relative ${(props.value === 5 - i) ? 'is_checked' : ''}`} //Mandatory class trick as :has is still not supported on Firefox & Edge
          key={`rating-${5 - i}`}>
          <input
            type="radio"
            value={5 - i}
            name="rating"
            className={radioStyle}
            checked={(props.value === 5 - i)}
            autoComplete="off"/>
          <StarSvg style={'star-icon ' + starStyle} />
          <StarSvg style={starEffectStyle} />
        </label>
      ))}
    </fieldset>
  );
}
