import type { TMDBMovieCredits } from 'models/custom_types/index';

const creditsFormater = (credits: TMDBMovieCredits) => {
  return Object.keys(credits)
    .reduce((formatedObject: {[key: string]: string[] } | undefined, property) => {
      if (formatedObject && property === 'cast'){
        formatedObject['casting'] = credits
          .cast.slice(0, 5)
          .map((a) => (a.name));
      }
      if (formatedObject && property === 'crew'){
        const directors: string[] = [];
        credits.crew.forEach(
          (cm) => (cm.job === 'Director') && directors.push(cm.name)
        );
        formatedObject['directors'] = directors;
      }
      return formatedObject;
    }, {});
};
export default creditsFormater;
