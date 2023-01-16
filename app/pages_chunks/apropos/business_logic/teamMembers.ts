const teamMembers = [
  {
    pictureUrl: '/team_photos/Julien_Goletto.png',
    completeName: 'Julien Goletto',
    roles: ['Dev Fullstack & Lead FrontEnd', 'UI/UX Designer'],
    contacts: [
      { medium: 'linkedin', url: 'https://www.linkedin.com/in/julien-goletto-a589a2203' },
      { medium: 'github', url: 'https://github.com/Julien-Goletto' },
      { medium: 'discord', url: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '' },
    ],
  },
  {
    pictureUrl: '/team_photos/Gregory_Michalak.png',
    completeName: 'Benoît Safari',
    roles: ['Dev Fullstack & Lead BackEnd'],
    contacts: [
      { medium: 'linkedin', url: 'https://www.linkedin.com/in/gregory-michalak' },
      { medium: 'github', url: 'https://github.com/BenoitSafari' },
      { medium: 'discord', url: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '' },
    ],
  },
];

export default teamMembers;
