import Image from 'next/image';
import placeHolder from '/movie_posters/placeholder.jpg';

interface PosterProps{
  src: string;
  title: string;
  type?: 'caroussel' | 'grid'
}

const Poster = ({ src, title, type }: PosterProps) => {
  const basicStyle = 'rounded-lg w-full h-full object-cover shadow-lg max-w-[240px] max-h-[360] ';
  const interactiveStyle = 'hover:scale-105 transition duration-150 hover:ease-out ';
  const carousselStyle = 'fourth-child:hidden fifth-child:hidden sixth-child:hidden md:fourth-child:block lg:fifth-child:block xl:sixth-child:block';

  const styleResolver = (type?: 'caroussel' | 'grid') => {
    let style = basicStyle;
    if (type) style += interactiveStyle;
    if (type === 'caroussel') style += carousselStyle;
    return style;
  };

  return (
    <Image
      src={src}
      alt={`${title} movie poster`}
      width={240}
      height={360}
      className={styleResolver(type)}
      placeholder='blur'
      blurDataURL='/movie_posters/placeholder.jpg'
    />
  );
};
export default Poster;
