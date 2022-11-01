import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('MOVIES ENDPOINTS', () => {
  const { app, res, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    login: { 
      method: 'POST',
      url: '/login',
    },
    getMovies: { 
      method: 'GET',
      url: '/movies',
    },
    postProposition: { 
      method: 'POST',
      url: '/movies',
    },
    putProposition: { 
      method: 'PUT',
      url: '/movies/:id',
    },
    publishMovie: { 
      method: 'PUT',
      url: '/movies/publish/:id',
    },
    deleteMovie: { 
      method: 'DELETE',
      url: '/movies/:id',
    }
  };

  test('GET MOVIES', async () => {
    // Login as user
    inject.login = {
      ...inject.login,
      payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
    };
    const login = await app.inject(inject.login);
    const { token } = await login.json();
    
    // GET MOVIES WITH NO QUERY
    const getAllMovies = await app.inject(inject.getMovies);
    expect(await getAllMovies.json()).toEqual(expect.arrayContaining([expectedObjects.movie]));

    // GET MOVIES WITH LIMIT AND ORDERBY QUERY
    const getMoviesOrderedAndLimited = await app.inject({
      ...inject.getMovies,
      url: '/movies?limit=3&sort=desc'
    });
    const fullArray = await getMoviesOrderedAndLimited.json();
    expect(fullArray.length).toEqual(3);
    expect(fullArray[0].id > fullArray[fullArray.length -1].id).toBeTruthy();

    // GET MOVIES WITH WHERE TESTS
    const getMoviesWhereId = await app.inject({
      ...inject.getMovies,
      url: '/movies?where[id]=1'
    });
    expect(await getMoviesWhereId.json()[0].id).toEqual(1);

    const getMoviesWhereAuthorId = await app.inject({
      ...inject.getMovies,
      url: '/movies?where[author_id]=1'
    });
    expect(await getMoviesWhereAuthorId.json()[0].author_id).toEqual(1);

    const getMoviesWhereSeasonId = await app.inject({
      ...inject.getMovies,
      url: '/movies?where[season_number]=3'
    });
    expect(await getMoviesWhereSeasonId.json()[0].season_number).toEqual(3);

    const getPublishedMovies = await app.inject({
      ...inject.getMovies,
      url: '/movies?where[is_published]=true'
    });
    expect(await getPublishedMovies.json()[0].is_published).toEqual(true);

    // GET MOVIES WITH SELECT TESTS
    const getMoviesWithPopulators = await app.inject({
      ...inject.getMovies,
      url: '/movies?limit=1&select[casting]=true&select[directors]=true&select[runtime]=true&select[release_date]=true&select[genres]=true&select[countries]=true&select[languages]=true&select[presentation]=true&select[metrics]=true&select[comments]=true'
    });
    expect(await getMoviesWithPopulators.json()).toEqual(expect.arrayContaining([expectedObjects.movieFullObject]));
  });

  test('MOVIE PROPOSITION', async () => {
    // TODO: Write tests
  });

  test('UPDATE MOVIE PROPOSITION', async () => {
    // TODO: Write tests
  });

  test('PUBLISH MOVIE PROPOSITION AS ADMIN', async () => {
    // TODO: Write tests
  });

  test('DELETE MOVIE AS ADMIN', async () => {
    // TODO: Write tests
  });
});
