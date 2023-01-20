import Link from 'next/link';

const Contact = () => {
  return (
    <section className="w-full">
      <h2 className="title-section">Coordonnées :</h2>
      <p>
        {'Vous pouvez joindre l\'équipe de Cinévoraces à l\'adresse suivante : '}
        <Link
          target="_blank"
          href="mailto:cinevoraces@gmail.com"
          className="underline text-orange-primary">
              cinevoraces@gmail.com
        </Link>
      </p>
    </section>
  );
};
export default Contact;
