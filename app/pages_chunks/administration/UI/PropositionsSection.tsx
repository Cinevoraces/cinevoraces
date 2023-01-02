// import type { Proposition } from '@custom_types/index';
import type { SWRResponse } from 'swr';

interface PropositionsSectionProps {
  propositions: {}[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: Error;  
}

const PropositionsSection = ({ propositions, error }: PropositionsSectionProps) => {
  return (
    <section>
      <h2 className="custom-container items-start py-4 title-section">Propositions</h2>
      <div className="custom-container bg-medium-gray">
        {
          error
            ? <p>Une erreur est survenue</p>
            : <p>Les propositions en attente.</p>
        }
      </div>
    </section>
  );
};
export default PropositionsSection;
