import Image from 'next/image';

interface PosterProps{
  src: string;
  title: string;
  type?: 'caroussel' | 'grid' | 'film' | 'card'
}

enum PosterStyles {
  grid = 'rounded-xl w-full h-full object-cover shadow-lg max-w-[240px] max-h-[360px] hover:scale-105 transition duration-150 hover:ease-out',
  film = 'rounded-xl w-full h-full object-cover shadow-lg relative max-w-[336px] max-h-[504px] object-cover',
  caroussel = 'rounded-xl w-full h-full object-cover shadow-lg max-w-[240px] max-h-[360px] hover:scale-105 transition duration-150 hover:ease-out fourth-child:hidden fifth-child:hidden sixth-child:hidden md:fourth-child:block lg:fifth-child:block xl:sixth-child:block',
  card = 'rounded-xl w-full h-full object-cover shadow-lg rounded-lg max-w-[125px]',
}
/**
 * 
 * @param src path to ressource
 * @param title 
 * @param type specify the context where the component is used
 * @returns A unified movie poster component, using Next Image tool as much as possible
 */
const Poster = ({ src, title, type }: PosterProps) => {

  const styleResolver = (type?: 'caroussel' | 'grid' | 'film' | 'card') => {
    if (type) return PosterStyles[type];
    return PosterStyles['grid'];
  };

  return (
    <Image
      src={src}
      alt={`${title} movie poster`}
      width={(type === 'card') ? 125 : (type === 'grid') ? 240 : 336}
      height={(type === 'card') ? 187.5 : (type === 'grid') ? 360 : 504}
      className={styleResolver(type)}
      placeholder='blur'
      blurDataURL='/poster_placeholder.jpg'
    />
  );
};
export default Poster;
