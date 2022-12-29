import type TestServer from './TestServer';

export async function ROUTES_MOVIES(server: TestServer) {
  describe('MOVIES ENDPOINTS', () => {
    
    test('GET MOVIES', async () => {
      const SUCCESSFULL_GET_ALL_MOVIES = await server.RequestMovies();
      expect(SUCCESSFULL_GET_ALL_MOVIES.res).toEqual(expect.arrayContaining([server.expected.movie]));

      const SUCCESSFULL_GET_MOVIES_ORDERED_AND_LIMITED = await server.RequestMovies('limit=3&sort=desc');
      const { res: ORD_LMT } = SUCCESSFULL_GET_MOVIES_ORDERED_AND_LIMITED;
      expect(ORD_LMT.length).toEqual(3);
      expect(ORD_LMT[0].id > ORD_LMT[ORD_LMT.length - 1].id).toBeTruthy();
      
      const SUCCESSFULL_GET_MOVIES_FILTERED_BY_ID = await server.RequestMovies('where[id]=1');
      expect(SUCCESSFULL_GET_MOVIES_FILTERED_BY_ID.res[0].id).toEqual(1);

      const SUCCESSFULL_GET_MOVIES_FILTERED_BY_AUTHOR = await server.RequestMovies('where[author_id]=1');
      expect(SUCCESSFULL_GET_MOVIES_FILTERED_BY_AUTHOR.res[0].author_id).toEqual(1);

      const SUCCESSFULL_GET_MOVIES_FILTERED_BY_SEASON = await server.RequestMovies('where[season_number]=1');
      expect(SUCCESSFULL_GET_MOVIES_FILTERED_BY_SEASON.res[0].season_number).toEqual(1);

      const SUCCESSFULL_GET_MOVIES_FILTERED_BY_STATUS = await server.RequestMovies('where[is_published]=true');
      expect(SUCCESSFULL_GET_MOVIES_FILTERED_BY_STATUS.res[0].is_published).toBeTruthy();

      const SUCCESSFULL_GET_MOVIES_POPULATED_WITH_MANY = await server.RequestMovies(
        'limit=1&select[casting]=true&select[directors]=true&select[runtime]=true&select[release_date]=true&select[genres]=true&select[countries]=true&select[languages]=true&select[presentation]=true&select[metrics]=true&select[comments]=true'
      );
      expect(SUCCESSFULL_GET_MOVIES_POPULATED_WITH_MANY.res).toEqual(expect.arrayContaining([server.expected.movieFullObject]));
    });

    test('MOVIE PROPOSALS', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      const postMoviePayload = {
        french_title: server.faker.lorem.words(2),
        original_title: server.faker.lorem.words(2),
        release_date: server.faker.date.past().toISOString(),
        episode_id: server.ressources.episodes[0].id,
      };

      // Test post/update movie proposal as user
      const FAILURE_POST_MOVIE = await server.RequestProposeMovie(
        logUser.tokens.accessToken,
        {
          french_title: 'Les Chaussons rouges',
          original_title: 'The Red Shoes'
        });
      const SUCCESSFULL_POST_MOVIE = await server.RequestProposeMovie(
        logUser.tokens.accessToken,
        postMoviePayload
      );
      
      expect(SUCCESSFULL_POST_MOVIE.statusCode).toEqual(201);
      expect(FAILURE_POST_MOVIE.statusCode).toEqual(422);
      const SUCCESSFULL_UPDATE_MOVIE_PROPOSAL = await server.RequestUpdateMovieProposal(
        logUser.tokens.accessToken,
        'Tester, c\'est douter.',
        postMoviePayload
      );

      expect(SUCCESSFULL_UPDATE_MOVIE_PROPOSAL.statusCode).toEqual(201);

      // Test publish movie proposal as admin
      const logAdmin = await server.RequestLogin({
        pseudo: server.ressources.admins[0].pseudo,
        password: server.ressources.admins[0].password.clear,
      });

      const SUCCESSFULL_PUBLISH_MOVIE_PROPOSAL = await server.RequestAdminPublishMovie(
        logAdmin.tokens.accessToken,
        { password: server.ressources.admins[0].password.clear },
        postMoviePayload
      );

      expect(SUCCESSFULL_PUBLISH_MOVIE_PROPOSAL.statusCode).toEqual(204);

      // Test delete movie proposal as admin
      const SUCCESSFULL_DELETE_MOVIE_PROPOSAL = await server.RequestAdminDeleteMovie(
        logAdmin.tokens.accessToken,
        { password: server.ressources.admins[0].password.clear },
        postMoviePayload
      );

      expect(SUCCESSFULL_DELETE_MOVIE_PROPOSAL.statusCode).toEqual(204);
    });
  });
}
