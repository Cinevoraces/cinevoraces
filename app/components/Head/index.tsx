import Head from 'next/head';

interface HeadProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

/**
 * 
 * @param title title page
 * @param description short page description
 * @param slug page slug
 * @param imageUrl chosen url to represent the page
 * @returns <Head> custom component to be used on each page
 */
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
      <meta property="og:image:height" content="100"/>
      <meta name="theme-color" content="#202029"/>
      {/* <meta name="twitter:card" content="summary_large_image"/> */}
    </Head>
  );
};
export default CustomHead;
