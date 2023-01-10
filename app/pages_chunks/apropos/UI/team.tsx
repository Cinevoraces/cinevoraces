import type { TeamMember } from '@custom_types/teamMember';
import TeamMemberCard from '@components/TeamMemberCard';
interface TeamProps {
  teamMembers: TeamMember[]
}

const Team = ({ teamMembers }: TeamProps) => {
  return (
    <section className="w-full">
      <h2 className="title-section mb-4">{'L\'équipe :'}</h2>
      <ul className="w-full grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((m) => (
          <li key={m.completeName}>
            <TeamMemberCard {...m} />
          </li>
        ))}
      </ul>
      <h2 className="title-section mb-4">{'Ont participé à l\'aventure :'}</h2>
      <div className="flex flex-col gap-3">
        <p>
              Équipe v1 : <span className="emphasis">Anthony Espirat</span> (Design & FrontEnd),{' '}
          <span className="emphasis">{'Joffrey D\'Ortoli'}</span> (BackEnd) &{' '}
          <span className="emphasis">Gino Salomé</span> (FrontEnd).
        </p>
        <p>
              Remerciements particuliers : <span className="emphasis">Camille Michalak</span> (Conseils en
              communication) & <span className="emphasis">Disco Blitzkrieg</span>{' (Graphisme de la page d\'erreur).'}
        </p>
      </div>
    </section>
  );
};
export default Team;
