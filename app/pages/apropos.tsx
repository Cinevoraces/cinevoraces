import type { NextPage } from 'next';
import CustomHead from '@components/Head';

import teamMembers from 'pages_chunks/apropos/business_logic/teamMembers';
import { Presentation, Team, Credits, Origin, Contact } from 'pages_chunks/apropos/UI';

const ComponentName: NextPage = () => {
  return (
    <>
      <CustomHead
        title="Cinévoraces - À propos"
        description="Découvrez l'origine du projet et son équipe"
        slug="/apropos"
      />
      <main className="custom-container">
        <h1 className="hero-text w-full">
          À propos de <span className="text-orange-primary">Cinévoraces</span>
        </h1>
        <Presentation/>
        <Team teamMembers={teamMembers}/>
        <Credits/>
        <Origin/>
        <Contact/>
      </main>
    </>
  );
};

export default ComponentName;
