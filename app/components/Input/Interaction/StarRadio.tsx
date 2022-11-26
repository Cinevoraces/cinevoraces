import React from 'react';
import { StarSvg } from './SVG';

export default function StarRadio() {

  const radioStyle = ` radio-input absolute z-20 cursor-pointer 
  peer w-6 h-6 border-none 
  bg-transparent text-transparent 
  checked:bg-none 
  focus:border-transparent focus:ring-none focus:ring-offset-0 focus:ring-transparent 
  hover:border-orange-primary hover:ring-none 
  `;
  const starStyle = `absolute z-10 fill-dark-gray 
  peer-hover:fill-yellow peer-focus:fill-yellow peer-checked:fill-yellow 
  ease-out duration-300 `;
  const starEffectStyle = `absolute scale-[1.75] -top-[0.5px] fill-transparent 
  peer-hover:fill-white/5 peer-focus:fill-white/5 
  ease-out duration-300`;

  return (
    <fieldset className='w-52 h-10 flex flex-row-reverse gap-10'>
      <legend className="sr-only">Notez le film sur 5</legend>
      {
        [...Array(5)].map((_, i) => (
          <label htmlFor="rating" className='relative ' key={`rating-${i + 1}`}>
            <input type="radio" value={i + 1} name='rating' className={radioStyle}/>
            <StarSvg style={'star-icon ' + starStyle}/>
            <StarSvg style={starEffectStyle}/>
          </label>)
        )
      }
    </fieldset>
  );
}

