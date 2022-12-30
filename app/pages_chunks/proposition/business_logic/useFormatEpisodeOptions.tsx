import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { Episode, EpisodeOption } from '@custom_types/index';
import dateFormater from '@utils/dateFormater';

/** Hook that checks if a connected user has a pending proposition
 * @param userId number | undefined
 * @param userPendingProposition MinimalMovie[] - Array that contains 1 or 0 movie object
 * @param userPendingPropositionMutate KeyedMutator - Toggle a data refresh in case user connects on this page
 * @param userHasPendingProposition boolean
 */
const useFormatEpisodeOptions = (
  episodes: Episode[],
  episodesArray: MutableRefObject<EpisodeOption[]>,
) => {
  useEffect(() => {
    if (episodes) {
      episodesArray.current = episodes.map(
        (e: Episode) => (
          { name: `${dateFormater(e.publishing_date)} - S${e.season_number}E${e.episode_number}`, 
            value: e.id, 
          })
      );
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodes]);
};

export default useFormatEpisodeOptions;
