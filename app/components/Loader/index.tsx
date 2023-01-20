import { SimpleLogo } from '../SvgComponents';

const Loader = () => {
  return (
    <div className='relative flex items-center justify-center 
        animate-bounce before:absolute 
        before:z-0 before:w-10 before:h-10 before:rounded-full before:bg-white/25 before:animate-ping-reverse'>
      <SimpleLogo
        style="relative z-10 w-16 h-16"/>
    </div>
  );
};

export default Loader;
