import { Select } from '@components/Input';
import type { Dispatch, SetStateAction } from 'react';
import type { EpisodeOption } from '@custom_types/propositionPage';

interface PickEpisodeProps {
  episodesArray: EpisodeOption [];
  areOptionsDisplayed: boolean;
  handleOptionsDisplay: ()=>void;
  episode: EpisodeOption;
  setEpisode: Dispatch<SetStateAction<EpisodeOption>>
}

const PickEpisode = ((props: PickEpisodeProps) => {
  const { episodesArray, areOptionsDisplayed, handleOptionsDisplay, episode, setEpisode } = props;
  return (
    <>
      <section className="custom-container py-4 items-start gap-4">
        <h2 className="title-section">1 - Sélectionnez un épisode</h2>
        <p>
          1 saison = 1 année <br /> 1 épisode = 1 semaine
        </p>
        { (episodesArray) && (
          <Select
            name="select-episode"
            displayOptionsState={areOptionsDisplayed}
            displayOptionsSetter={handleOptionsDisplay}
            options={episodesArray}
            stateValue={episode}
            valueSetter={setEpisode}
          />
        )}
      </section>
    </>
  );
});

export default PickEpisode;
