import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_MOVIES(server: server) {
  describe('MOVIES ENDPOINTS', () => {
    const { app, res, expectedObjects, faker } = server;
    const inject: Record<string, InjectOptions> = {
      login: { 
        method: 'POST',
        url: '/login',
      },
      putReview: {
        method: 'PUT',
        url: '/reviews/1',
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
        url: '/movies',
      },
      publishMovie: { 
        method: 'PUT',
        url: '/admin/movies/publish/:id',
      },
      deleteMovie: { 
        method: 'DELETE',
        url: '/admin/movies/:id',
      }
    };

    const validPropositionPayload = {
      french_title: faker.lorem.words(2),
      original_title: faker.lorem.words(2),
      poster_url: faker.image.imageUrl(),
      directors: [faker.name.fullName()],
      release_date: faker.date.past(),
      runtime: 150,
      casting: [faker.name.firstName()],
      presentation: faker.lorem.paragraph(),
      publishing_date: faker.date.past(),
      season_id: 3,
      movie_genres: ['Suspense insoutenable'],
      movie_languages: ['Français'],
      movie_countries: ['France du Nord'],
    };
    const wrongPropositionPayload = {
      ...validPropositionPayload, 
      french_title: 'Les Chaussons rouges', 
      original_title: 'The Red Shoes'
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

      // GET MOVIES AS LOGGED USER
      inject.getMovies = {
        ...inject.getMovies,
        headers: { Authorization: `Bearer ${token}` },
      };
      await app.inject({
        ...inject.putReview,
        payload: { rating: 5 },
        headers: { authorization: `Bearer ${token}` },
      });
      const getAllMoviesAsUser = await app.inject({
        ...inject.getMovies,
        url: '/movies?limit=2&sort=asc'
      });
      expect(await getAllMoviesAsUser.json()[0]).toEqual(expect.objectContaining({ user_review: expect.any(Object) }));
      expect(await getAllMoviesAsUser.json()[1]).toEqual(expect.not.objectContaining({ user_review: expect.any(Object) }));
  
      // GET PROPOSITIONS
      const test = await app.inject({
        ...inject.getMovies,
        url: '/movies?where[is_published]=false&select[presentation]=true'
      });
      expect(await test.json()).toEqual(expect.arrayContaining([
        expect.objectContaining({ presentation: expect.any(Object), is_published: false })
      ]));
    });

    test('PROPOSE MOVIE', async () => {
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
      };
      const login = await app.inject(inject.login);
      const { token } = await login.json();

      // PROPOSE EXISTING MOVIE
      inject.postProposition = {
        ...inject.postProposition,
        payload: wrongPropositionPayload,
        headers: { Authorization: `Bearer ${token}` },
      };
      const failPostProposition = await app.inject(inject.postProposition);
      expect(failPostProposition.statusCode).toEqual(422);

      // SUCCESSFULLY PROPOSE MOVIE
      inject.postProposition = {
        ...inject.postProposition,
        payload: validPropositionPayload,
        headers: { Authorization: `Bearer ${token}` },
      };
      const validPostProposition = await app.inject(inject.postProposition);
      expect(validPostProposition.statusCode).toEqual(201);
    });

    test('UPDATE MOVIE PROPOSITION', async () => {
      // LOG USER
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[2].user.pseudo, password: res.users[2].user.password },
      };
      const login = await app.inject(inject.login);
      const { token } = await login.json();

      // FAIL UPDATE MOVIE PROPOSITION
      inject.putProposition = {
        ...inject.putProposition,
        payload: {
          presentation: 'LOOOOOOOOOOL',
          movie_id: res.movies[1].movie.id,
        },
        headers: { Authorization: `Bearer ${token}` },
      };
      const failPutProposition = await app.inject(inject.putProposition);
      expect(failPutProposition.statusCode).toEqual(404);

      // UPDATE EXISTING MOVIE PROPOSITION
      inject.putProposition = {
        ...inject.putProposition,
        payload: {
          presentation: 'LOOOOOOOOOOL',
          movie_id: res.movies[4].movie.id,
        },
      };
      const successPutProposition = await app.inject(inject.putProposition);
      expect(successPutProposition.statusCode).toEqual(201);
    });

    test('PUBLISH MOVIE PROPOSITION AS ADMIN', async () => {
      // LOG ADMIN
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      };
      const login = await app.inject(inject.login);
      const { token } = await login.json();

      // FAIL PUBLISH MOVIE PROPOSITION
      inject.publishMovie = {
        ...inject.publishMovie,
        url: `/admin/movies/publish/${res.movies[0].movie.id}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const failPublishMovie = await app.inject(inject.publishMovie);
      expect(failPublishMovie.statusCode).toEqual(404);

      // SUCCESS PUBLISH MOVIE PROPOSITION
      inject.publishMovie = {
        ...inject.publishMovie,
        url: `/admin/movies/publish/${res.movies[1].movie.id}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const successPublishMovie = await app.inject(inject.publishMovie);
      expect(successPublishMovie.statusCode).toEqual(204);
    });

    test('DELETE MOVIE AS ADMIN', async () => {
      // LOG ADMIN
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      };
      const login = await app.inject(inject.login);
      const { token } = await login.json();

      // DELETE ONE MOVIE SUCCESSFULLY
      inject.deleteMovie = {
        ...inject.deleteMovie,
        url: `/admin/movies/${res.movies[0].movie.id}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const deleteOneMovie = await app.inject(inject.deleteMovie);
      expect(deleteOneMovie.statusCode).toEqual(204);
      
      // DELETE ONE MOVIE FAIL
      inject.deleteMovie = {
        ...inject.deleteMovie,
        url: `/admin/movies/${res.movies[0].movie.id}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const failDeleteOneMovie = await app.inject(inject.deleteMovie);
      expect(failDeleteOneMovie.statusCode).toEqual(404);
    });
  });
}
