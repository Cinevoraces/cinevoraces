import Image from 'next/image';
import placeHolder from '/movie_posters/placeholder.jpg';

interface PosterProps{
  src: string;
  title: string;
  type?: 'caroussel' | 'grid' | 'film'
}

const Poster = ({ src, title, type }: PosterProps) => {
  const basicStyle = 'rounded-xl w-full h-full object-cover shadow-lg max-w-[240px] max-h-[360px] ';
  const filmStyle = 'relative z-10 max-w-[336px] max-h-[504px] object-cover';
  const interactiveStyle = 'hover:scale-105 transition duration-150 hover:ease-out ';
  const carousselStyle = 'fourth-child:hidden fifth-child:hidden sixth-child:hidden md:fourth-child:block lg:fifth-child:block xl:sixth-child:block';

  const styleResolver = (type?: 'caroussel' | 'grid' | 'film') => {
    let style = basicStyle;
    if (type === 'film') return style + filmStyle;
    if (type) style += interactiveStyle;
    if (type === 'caroussel') style += carousselStyle;
    return style;
  };

  return (
    <Image
      src={src}
      alt={`${title} movie poster`}
      width={(type !== 'film') ? 240 : 336}
      height={(type !== 'film') ? 360 : 504}
      className={styleResolver(type)}
      placeholder='blur'
      blurDataURL='/movie_posters/placeholder.jpg'
    />
  );
};
export default Poster;
