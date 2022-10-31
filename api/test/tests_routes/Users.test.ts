import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('USERS ENDPOINTS', () => {
  const { app, res, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    login: { 
      method: 'POST',
      url: '/login',
    },
    getUsers: {
      method: 'GET',
      url: '/users',
    },
    deleteUser: {
      method: 'DELETE',
      url: '/users/:id'
    },
    updateUser: {
      method: 'PUT',
      url: '/users/:id',
    },
  };

  test('GET USERS', async () => {
    // GET ALL USERS WITHOUT POPULATING
    const getDefaultUsers = await app.inject(inject.getUsers);
    expect(await getDefaultUsers.json()).toEqual(expect.arrayContaining([expectedObjects.user]));

    // GET ALL USERS WITH REVIEWS
    const getUsersWithReviews = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=true'
    });
    expect(await getUsersWithReviews.json()).toEqual(expect.arrayContaining([expectedObjects.userWithReviews]));

    // GET ALL USERS WITH PROPOSITIONS, METRICS AND REVIEWS
    const getUsersWithMoviesReviewsAndMetrics = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=true&select[metrics]=true&select[propositions]=true'
    });
    expect(await getUsersWithMoviesReviewsAndMetrics.json()).toEqual(expect.arrayContaining([expectedObjects.userWithMoviesReviewsAndMetrics]));

    // TESTING "false" STATEMENTS
    const getUsersWithPopulatorsSetToFalse = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=false&select[metrics]=false&select[propositions]=false'
    });
    expect(await getUsersWithPopulatorsSetToFalse.json()).toEqual(expect.arrayContaining([expectedObjects.user]));

    // GET USER(S) BY ID
    const getUsersFilteredById = await app.inject({
      ...inject.getUsers,
      url: '/users?where[id]=1'
    });
    expect(await getUsersFilteredById.json().length).toEqual(1);
    expect(await getUsersFilteredById.json()[0]).toEqual(expect.objectContaining({ id: 1 }));

    // GET USER(S) BY PSEUDO
    const getUsersFilteredByPseudo = await app.inject({
      ...inject.getUsers,
      url: `/users?where[pseudo]=${res.users[0].user.pseudo}`
    });
    expect(await getUsersFilteredByPseudo.json().length).toEqual(1);
    expect(await getUsersFilteredByPseudo.json()[0]).toEqual(expect.objectContaining({ pseudo: res.users[0].user.pseudo }));

    // GET USER(S) BY MAIL
    const getUsersFilteredByMail = await app.inject({
      ...inject.getUsers,
      url: `/users?where[mail]=${res.users[0].user.mail}`
    });
    expect(await getUsersFilteredByMail.json().length).toEqual(1);
    expect(await getUsersFilteredByMail.json()[0]).toEqual(expect.objectContaining({ mail: res.users[0].user.mail }));

    // GET USER(S) BY ROLE
    const getUsersFilteredByRole = await app.inject({
      ...inject.getUsers,
      url: '/users?where[role]=user'
    });
    expect(await getUsersFilteredByRole.json()[0]).toEqual(expect.objectContaining({ role: 'user' }));

    // GET ONE USER WITH REVIEWS
    const getOneUserWithReviews = await app.inject({
      ...inject.getUsers,
      url: '/users?where[id]=1&select[reviews]=true'
    });
    expect(await getOneUserWithReviews.json().length).toEqual(1);
    expect(await getOneUserWithReviews.json()).toEqual(expect.arrayContaining([expectedObjects.userWithReviews]));

    // GET '404' WHEN NO RESULTS
    const get404WhenNoResults = await app.inject({
      ...inject.getUsers,
      url: '/users?where[pseudo]=admin&where[id]=1'
    });
    expect(get404WhenNoResults.statusCode).toEqual(404);

  });

  test('DELETE USERS', async () =>{
    // LOG ADMIN
    inject.login = {
      ...inject.login, 
      payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
    };
    const login = await app.inject({
      ...inject.login,
      payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
    });
  });
});
