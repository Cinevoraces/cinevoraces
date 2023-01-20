import Image from 'next/image';
import Link from 'next/link';
import { GitHub, Linkedin, Discord, Website } from '@components/SvgComponents/Social';
import type { TeamMember } from 'models/custom_types/teamMember';

interface SocialMediaComponents {
  [key: string]: React.ReactNode;
}
const mediaStyle = 'w-6 h-6 fill-dark-gray hover:fill-orange-primary ease-out duration-300';
const socialMediaComponents: SocialMediaComponents= {
  'github': <GitHub style={mediaStyle}/>,
  'linkedin': <Linkedin style={mediaStyle}/>,
  'discord': <Discord style={mediaStyle}/>,
  'website': <Website style={mediaStyle}/>,
};

interface TeamMemberCardProps extends TeamMember{}

const TeamMemberCard = ({ pictureUrl, completeName, roles, contacts }: TeamMemberCardProps) => {
  return (
    <div className="relative w-[300px] px-2 py-4 mt-12 mb-6 bg-medium-gray rounded-xl shadow-lg">
      <Image
        src={pictureUrl}
        alt={`Photo de prodil de ${completeName}`}
        width={120}
        height={120}
        className="absolute -top-10 inset-x-[90px] w-[120px] rounded-full border-4 border-dark-gray"
      />
      <div className='mt-16 flex flex-col justify-between min-h-[125px]'>
        <h2 className="title-section w-full text-center">{completeName}</h2>
        <ul className='w-full text-center'>
          {roles.map((r) => (
            <li key={r} className="font-light">{r}</li>
          ))}
        </ul>
        <ul className='w-full flex justify-center gap-4'>
          {contacts.map((c) => (
            <li key={c.url}>
              <Link target="_blank" href={c.url}>{socialMediaComponents[c.medium]}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TeamMemberCard;
