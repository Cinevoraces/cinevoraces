// import type { Proposition } from '@custom_types/index';
import type { SWRResponse } from 'swr';

interface PropositionsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propositions: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error;  
}

const PropositionsSection = ({ propositions, error }: PropositionsSectionProps) => {
  return (
    <section>
      <h2 className="custom-container items-start py-4 title-section">Propositions</h2>
      <div className="bg-medium-gray">
        <div className='custom-container'>
          {
            error
              ? <p>{error.message}</p>
              : (propositions && propositions.length > 0)
                ? (
                  <ul>
                    {
                      propositions.map((p) => (<li key={p.french_title}>{p.french_title}</li>))
                    }
                  </ul>
                  
                )
                : <p>{'Aucune proposition n\'est en attente.'}</p>
          }
        </div>
      </div>
    </section>
  );
};
export default PropositionsSection;
