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
    const getDefaultUsers = await app.inject(inject.getUsers);
    expect(await getDefaultUsers.json()).toEqual(expect.arrayContaining([expectedObjects.user]));

    const getUsersWithReviews = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=true'
    });
    expect(await getUsersWithReviews.json()).toEqual(expect.arrayContaining([expectedObjects.userWithReviews]));

    const getUsersWithMoviesReviewsAndMetrics = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=true&select[metrics]=true&select[propositions]=true'
    });
    expect(await getUsersWithMoviesReviewsAndMetrics.json()).toEqual(expect.arrayContaining([expectedObjects.userWithMoviesReviewsAndMetrics]));

    const getUsersWithPopulatorsSetToFalse = await app.inject({
      ...inject.getUsers,
      url: '/users?select[reviews]=false&select[metrics]=false&select[propositions]=false'
    });
    expect(await getUsersWithPopulatorsSetToFalse.json()).toEqual(expect.arrayContaining([expectedObjects.user]));

    const getUsersFilteredById = await app.inject({
      ...inject.getUsers,
      url: '/users?where[id]=1'
    });

    expect(await getUsersFilteredById.json().length).toEqual(1);
    expect(await getUsersFilteredById.json()[0]).toEqual(expect.objectContaining({ id: 1 }));
  });

  // test('DELETE USERS', async () =>{
  //   inject.login = {
  //     ...inject.login, 
  //     payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
  //   };
  //   const login = await app.inject({
  //     ...inject.login,
  //     payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
  //   });
  // });
});
