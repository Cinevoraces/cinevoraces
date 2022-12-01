import React from 'react';

interface RateProps {
  rate: number;
}

/**
 * @returns a component displaying an average note with colored stars and the number 
 * @param rate number 
 * Works properly only on Firefox, must be fixed for other browsers
 * One way to resolve it may : https://stackoverflow.com/questions/69801440/i-am-trying-to-clip-a-background-div-with-an-svg-text
 */
export default function Rate({ rate }: RateProps) {
  const floredRate = Math.floor(rate * 10)/10;
  const ratePercentage = Math.floor((rate / 5) * 100);
  const container = 'relative w-[71.25px] h-10 text-md text-transparent font-extrabold bg-dark-gray ';
  const genericStarsStyle =
    'absolute inset-y-0 h-[full] flex flex-nowrap flex-0 gap-.5 overflow-hidden bg-clip-text ';
  const filledStarsStyle = genericStarsStyle +
    `left-0 w-[${ratePercentage}%] bg-yellow `;
  const emptyStarsStyle = genericStarsStyle +
  `right-0 w-[${100 - ratePercentage}%] bg-medium-gray mirrorX `;
  return (
    <div className='flex gap-2'>
      <div className={container}>
        <div
          id="filled gauge"
          className={filledStarsStyle}>
          {[...Array(5)].map((_, i) => (
            <span key={`filled-${i}`}>★</span>
          ))}
        </div>
        <div
          id="empty gauge"
          className={emptyStarsStyle}>
          {[...Array(5)].map((_, i) => (
            <span key={`empty-${i}`}>★</span>
          ))}
        </div>
      </div>
      <p className='text-yellow'>{floredRate}</p>
    </div>
  );
}
