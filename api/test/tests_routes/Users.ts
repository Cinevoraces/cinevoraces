import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_USERS(server: server) {
  describe('USERS ENDPOINTS', () => {
    const { app, res, expectedObjects } = server;
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
        url: '/admin/users/:id'
      },
      updateUser: {
        method: 'PUT',
        url: '/users',
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

      // GET ALL USERS WITH LIMIT AND ORDERBY QUERY
      const getUsersOrderedAndLimited = await app.inject({
        ...inject.getUsers,
        url: '/users?limit=3&sort=desc'
      });
      const fullArray = await getUsersOrderedAndLimited.json();
      expect(fullArray.length).toEqual(3);
      expect(fullArray[0].id > fullArray[fullArray.length -1].id).toBeTruthy();

    });

    test('UPDATE USER', async () =>{
    // LOG USER
      inject.login = {
        ...inject.login, 
        payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
      };
      const login = await app.inject(inject.login);

      inject.updateUser = {
        ...inject.updateUser,
        headers: { Authorization: `Bearer ${login.json().token}` },
      };

      // TRY TO VIOLATE LENGTH CONSTRAINTS
      const violateConstraintsPseudo = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { pseudo: 'a'.repeat(33) }, password: res.users[1].user.password },
      });
      expect(violateConstraintsPseudo.statusCode).toEqual(400);
      const violateConstraintsMail = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { mail: `${'a'.repeat(48)}@testécédouter.com` }, password: res.users[1].user.password },
      });
      expect(violateConstraintsMail.statusCode).toEqual(400);
      const violateConstraintsPassword = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { password: 'a'.repeat(65) }, password: res.users[1].user.password },
      });
      expect(violateConstraintsPassword.statusCode).toEqual(400);

      // TEST PASSWORD ERRORS
      const passError1 = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { password: 'testécédouter' }, password: res.users[1].user.password },
      });
      expect(passError1.statusCode).toEqual(422);
      const passError2 = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { password: res.users[1].user.password }, password: 'testécédouter' },
      });
      expect(passError2.statusCode).toEqual(401);

      // TEST UNIQUE CONSTRAINT ERROR
      const uniqueConstraintError = await app.inject({
        ...inject.updateUser,
        payload: { update_user: { pseudo: res.users[0].user.pseudo }, password: res.users[1].user.password },
      });
      expect(uniqueConstraintError.statusCode).toEqual(500);

      // TEST SUCCESS
      const success1 = await app.inject({
        ...inject.updateUser,
        payload: { 
          update_user: { 
            pseudo: 'testécédouter',
            mail: 'testécédouter@testécédouter.com',
            password: 'T3st3!C!d0uT3r',
          }, 
          password: res.users[1].user.password 
        },
      });
      expect(success1.statusCode).toEqual(204);
    });

    test('DELETE USERS', async () =>{
    // LOG ADMIN
      const AdminLogin = await app.inject({
        ...inject.login, 
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      });
      // DELETE USER WITH ADMIN ROLE
      const deleteUser = {
        ...inject.deleteUser,
        headers: { Authorization: `Bearer ${AdminLogin.json().token}` },
        payload: { password: res.users[0].user.password },
        url: `/admin/users/${res.users[2].user.id}`,
      };
      const success = await app.inject(deleteUser);
      expect(success.statusCode).toEqual(204);

      const fail = await app.inject({
        ...deleteUser,
        url: '/admin/users/156468',
      });
      expect(fail.statusCode).toEqual(404);
    });
  });
}
