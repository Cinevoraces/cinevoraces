import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_REVIEWS(server: server) {
  describe('REVIEWS ENDPOINTS', () => {
    const { app, res, expectedObjects } = server;
    const inject: Record<string, InjectOptions> = {
      login: { 
        method: 'POST',
        url: '/login',
      },
      putReview: {
        method: 'PUT',
        url: '/reviews/1',
      },
      deleteReview: {
        method: 'DELETE',
      },
      adminGetReviews: {
        method: 'GET',
        url: '/admin/reviews',
      },
    };

    test('PUT REVIEWS', async () => {
    // Login as user and prepare request
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[2].user.pseudo, password: res.users[2].user.password },
      };
      const login = await app.inject(inject.login);
      const { token } = await login.json();
      inject.putReview = {
        ...inject.putReview,
        headers: { authorization: `Bearer ${token}` },
      };

      // Test PUT /reviews/:id where id is Movie's id
      const putReviewWithTooManyArgs = await app.inject({
        ...inject.putReview,
        payload: {
          rating: 5,
          comment: 'J\'aime tester des choses (C\'est faux)',
        },
      });
      expect(putReviewWithTooManyArgs.statusCode).toEqual(400);

      const bookmarkedTest = await app.inject({
        ...inject.putReview, payload: { bookmarked: true },
      });
      expect(bookmarkedTest.statusCode).toEqual(201);
      expect(await bookmarkedTest.json()).toEqual(expect.objectContaining({
        message: 'Film ajouté à ma liste.',
      }));

      const viewedTest = await app.inject({
        ...inject.putReview, payload: { viewed: true },
      });
      expect(viewedTest.statusCode).toEqual(201);
      expect(await viewedTest.json()).toEqual(expect.objectContaining({
        message: 'Film marqué comme vu.',
      }));

      const likedTest = await app.inject({
        ...inject.putReview, payload: { liked: true },
      });
      expect(likedTest.statusCode).toEqual(201);
      expect(await likedTest.json()).toEqual(expect.objectContaining({
        message: 'Film marqué comme aimé.',
      }));

      const ratingTest = await app.inject({
        ...inject.putReview, payload: { rating: 5 },
      });
      expect(ratingTest.statusCode).toEqual(201);
      expect(await ratingTest.json()).toEqual(expect.objectContaining({
        message: 'Film noté.',
      }));

      const commentTest = await app.inject({
        ...inject.putReview, payload: { comment: 'Tester c\'est douter' },
      });
      expect(commentTest.statusCode).toEqual(201);
      expect(await commentTest.json()).toEqual(expect.objectContaining({
        message: 'Commentaire ajouté.',
      }));

      const ratingUpdateTest = await app.inject({
        ...inject.putReview, payload: { rating: 2 },
      });
      expect(ratingUpdateTest.statusCode).toEqual(201);
      expect(await ratingUpdateTest.json()).toEqual(expect.objectContaining({
        message: 'Note mise à jour.',
      }));

      const commentUpdateTest = await app.inject({
        ...inject.putReview, payload: { comment: 'Tester autant de fois, c\'est plus douter, c\'est un manque de respect!' },
      });
      expect(commentUpdateTest.statusCode).toEqual(201);
      expect(await commentUpdateTest.json()).toEqual(expect.objectContaining({
        message: 'Commentaire mis à jour.',
      }));
    });

    test('DELETE REVIEWS', async () => {
    // Log user
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
      };
      const log_user = await app.inject(inject.login);
      const { token: user_token } = await log_user.json();
      // Log Admin
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      };
      const log_admin = await app.inject(inject.login);
      const { token: admin_token } = await log_admin.json();
    
      // Create the review as user
      await app.inject({
        ...inject.putReview,
        payload: { rating: 5 },
        headers: { authorization: `Bearer ${user_token}` },
      });
      // Try to delete the review as user
      inject.deleteReview = {
        ...inject.deleteReview,
        headers: { authorization: `Bearer ${user_token}` },
        payload: { password: res.users[1].user.password },
        url: `/admin/reviews/1/${res.users[1].user.id}`,
      };
      const deleteReviewAsUser = await app.inject(inject.deleteReview);
      expect(deleteReviewAsUser.statusCode).toEqual(403);

      // Delete the review as admin
      inject.deleteReview = {
        ...inject.deleteReview,
        headers: { authorization: `Bearer ${admin_token}` },
      };
      const deleteReviewAsAdminWithoutPassword = await app.inject(inject.deleteReview);
      expect(deleteReviewAsAdminWithoutPassword.statusCode).toEqual(401);
      inject.deleteReview = {
        ...inject.deleteReview,
        headers: { authorization: `Bearer ${admin_token}` },
        payload: { password: res.users[0].user.password },
      };
      const deleteReview = await app.inject(inject.deleteReview);
      expect(deleteReview.statusCode).toEqual(204);
      expect(await deleteReview.json()).toEqual(expect.objectContaining({
        message: expect.any(String),
      }));
    });

    test('GET REVIEWS', async () => {
    // Log Admin
      inject.login = {
        ...inject.login,
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      };
      const log_user = await app.inject(inject.login);
      const { token } = await log_user.json();
      await app.inject({
        ...inject.putReview,
        payload: { comment: 'Tester c\'est douter' },
        headers: { authorization: `Bearer ${token}` },
      });
      inject.adminGetReviews = {
        ...inject.adminGetReviews,
        headers: { authorization: `Bearer ${token}` },
      };

      const withoutQueryString = await app.inject(inject.adminGetReviews);
      expect(await withoutQueryString.json()).toEqual(expect.arrayContaining([expectedObjects.review]));
      expect(withoutQueryString.statusCode).toEqual(200);

      const withQueryString = await app.inject({
        ...inject.adminGetReviews,
        query: `where[movie_id]=1&where[author_id]=${res.users[0].user.id}`,
      });

      const UnauthorizedQueryString = await app.inject({
        ...inject.adminGetReviews,
        query: `where[jambon]=1&where[author_id]=${res.users[0].user.id}`,
      });

      expect(await withQueryString.json()).toEqual(expect.arrayContaining([expectedObjects.review]));
      expect(await withQueryString.json().length).toEqual(1);
      expect(withQueryString.statusCode).toEqual(200);
      expect(UnauthorizedQueryString.statusCode).toEqual(500);
    });
  });
}