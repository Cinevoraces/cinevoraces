import Head from 'next/head';

interface HeadProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

const CustomHead = ({ title, description, slug, imageUrl }: HeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:url" content={'https://cinevoraces.fr' + slug}/>
      <meta property="og:type" content='website'/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={(imageUrl) ? imageUrl : '/mstile-150x150.png'}/>
    </Head>
  );
};
export default CustomHead;
