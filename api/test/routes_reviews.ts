import type TestServer from './TestServer';
import { AddReview, UpdateReview } from '../src/types/enums/review';

export async function ROUTES_REVIEWS(server: TestServer) {
  describe('REVIEWS ENDPOINTS', () => {

    const moviesId: Array<number> = [];
    test('REVIEW MOVIES', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      // Get movies reference to test reviews
      await server.RequestMovies('limit=5&sort=asc').then((r) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        r.res.forEach((m: any) => moviesId.push(m.id));
      });
      
      const FAILURE_REVIEW_ONE_MOVIE_WITH_TOO_MANY_ARGS = await server.RequestReviewMovie(
        {
          rating: 5,
          comment: 'J\'aime tester des choses (C\'est faux)',
        },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(FAILURE_REVIEW_ONE_MOVIE_WITH_TOO_MANY_ARGS.statusCode).toEqual(400);

      const SUCCESSFULL_BOOKMARKED_MOVIE = await server.RequestReviewMovie(
        { bookmarked: true },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_BOOKMARKED_MOVIE.statusCode).toEqual(201);
      expect(SUCCESSFULL_BOOKMARKED_MOVIE.res.message).toEqual(AddReview.BOOKMARKED);

      const SUCCESSFULL_LIKED_MOVIE = await server.RequestReviewMovie(
        { liked: true },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_LIKED_MOVIE.statusCode).toEqual(201);
      expect(SUCCESSFULL_LIKED_MOVIE.res.message).toEqual(AddReview.LIKED);

      const SUCCESSFULL_VIEWED_MOVIE = await server.RequestReviewMovie(
        { viewed: true },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_VIEWED_MOVIE.statusCode).toEqual(201);
      expect(SUCCESSFULL_VIEWED_MOVIE.res.message).toEqual(AddReview.VIEWED);

      const SUCCESSFULL_RATED_MOVIE = await server.RequestReviewMovie(
        { rating: 5 },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_RATED_MOVIE.statusCode).toEqual(201);
      expect(SUCCESSFULL_RATED_MOVIE.res.message).toEqual(AddReview.RATING);

      const SUCCESSFULL_COMMENTED_MOVIE = await server.RequestReviewMovie(
        { comment: 'Faire du TDD c\'est le fun (Je mens)' },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_COMMENTED_MOVIE.statusCode).toEqual(201);
      expect(SUCCESSFULL_COMMENTED_MOVIE.res.message).toEqual(AddReview.COMMENT);
      
      const SUCCESSFULL_UPDATE_RATE = await server.RequestReviewMovie(
        { rating: 4 },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_UPDATE_RATE.statusCode).toEqual(201);
      expect(SUCCESSFULL_UPDATE_RATE.res.message).toEqual(UpdateReview.RATING);

      const SUCCESSFULL_UPDATE_COMMENT = await server.RequestReviewMovie(
        { comment: 'Faire du TDD c\'est reloud mais c\'est une bonne pratique en vrai!' },
        moviesId[0],
        logUser.tokens.accessToken
      );
      expect(SUCCESSFULL_UPDATE_COMMENT.statusCode).toEqual(201);
      expect(SUCCESSFULL_UPDATE_COMMENT.res.message).toEqual(UpdateReview.COMMENT);
      
      const GET_MOVIES_WITH_USER_REVIEW_OBJ = await server.RequestMovies(
        `where[id]=${moviesId[0]}`,
        logUser.tokens.accessToken
      );

      expect(GET_MOVIES_WITH_USER_REVIEW_OBJ.res[0].user_review.bookmarked).toEqual(true);
    });

    test('MANAGE REVIEWS AS ADMIN', async () => {
      const logAdmin = await server.RequestLogin(
        {
          pseudo: server.ressources.admins[0].pseudo,
          password: server.ressources.admins[0].password.clear,
        }
      );

      // Get user id
      const { rows: user } = await server.fastify.pgClient.query({
        text: ` SELECT * FROM "user" 
              WHERE pseudo = $1;`,
        values: [server.ressources.users[0].pseudo]
      });

      const SUCCESSFULL_GET_ONE_REVIEW = await server.RequestAdminGetReviews(
        logAdmin.tokens.accessToken,
        `where[movie_id]=1&where[author_id]=${user[0].id}`
      );
      expect(SUCCESSFULL_GET_ONE_REVIEW.statusCode).toEqual(200);

      const SUCCESSFULL_DELETE_ONE_REVIEW = await server.RequestAdminDeleteReview(
        logAdmin.tokens.accessToken,
        { password: server.ressources.admins[0].password.clear },
        `/${moviesId[0]}/${user[0].id}`
      );

      expect(SUCCESSFULL_DELETE_ONE_REVIEW.statusCode).toEqual(204);
    });
  });
}
