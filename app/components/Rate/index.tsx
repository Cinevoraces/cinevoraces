interface RateProps {
  rate: number;
  type: 'global' | 'user';
}

/**
 * @returns a component displaying an average note with colored stars and the number 
 * @param rate number 
 * @param type essencially to display the number or not 
 */
const Rate = ({ rate, type }: RateProps) => {
  const floredRate = Math.floor(rate * 10)/10;
  const ratePercentage = Math.floor((rate / 5) * 100);
  const container = 'relative w-[100px] h-[100px] text-md clip-stars ';
  const genericStarsStyle =
    'absolute inset-y-0 h-full ';
  const filledStarsStyle = genericStarsStyle +
    'left-0 bg-yellow ';
  const emptyStarsStyle = genericStarsStyle +
  'right-0 bg-medium-gray ';
  return (
    <div className={`flex w-fit gap-3 px-3 py-1.5 
    items-start h-8
    bg-dark-gray rounded-full 
    sm:scale-75 origin-right lg:scale-100`}>
      {
        (type === 'global') &&
        <p className='text-yellow -mt-[1px] w-4 text-right'>{floredRate}</p>
      }
      <div className={container}>
        <div
          id="filled gauge"
          className={filledStarsStyle}
          style={{ 'width': ratePercentage }}>
        </div>
        <div
          id="empty gauge"
          className={emptyStarsStyle}
          style={{ 'width': 100 - ratePercentage }}>
        </div>
      </div>
    </div>
  );
};

export default Rate;
