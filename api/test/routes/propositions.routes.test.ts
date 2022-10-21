import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import bcrypt from 'bcrypt';
import expectedObjects from '../expectedObjects';

describe('Propositions routes test', () => {
  const { app, res } = build();
  const inject: Record<string, InjectOptions> = {
    login: { method: 'POST', url: '/login' },
    loginAdmin: { method: 'POST', url: '/login' },
    allMovies: { method: 'GET', url: '/movies' },
    movieById: { method: 'GET', url: '/movies/1' },
    allSlots: { method: 'GET', url: '/propositions/slots' },
    allPropositions: { method: 'GET', url: '/propositions' },
    propositionByUserId: { method: 'GET', url: '/propositions/users/1' }
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(res.password, 10);
    res.users[0] = await res.createUser({ password: encryptedPassword });
    res.users[1] = await res.createUser({ password: encryptedPassword, role: 'admin' });
    inject.login = { 
      ...inject.login, 
      payload: { 
        pseudo: res.users[0].data.pseudo, 
        password: res.password 
      } 
    };
    inject.loginAdmin = { 
      ...inject.loginAdmin, 
      payload: { 
        pseudo: res.users[1].data.pseudo, 
        password: res.password 
      } 
    };
    res.slots[0] = await res.createSlot({ is_booked: true });
    res.slots[1] = await res.createSlot({ is_booked: false });
    res.movies[0] = await res.createMovie(1, { is_published: false });
  });

  afterAll(async () => {
    res.users.forEach(user => user.remove());
    res.slots.forEach(slot => slot.remove());
    res.movies.forEach(movie => movie.remove());
  });
  
  test('GET /propositions - Get all propositions', async () => {
    const res = await app.inject(inject.allPropositions);
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([expectedObjects.proposition]));
  });

  test('GET /propositions/users/:id - Get one proposition by user ID', async () => {
    const successfullRequest = await app.inject(inject.propositionByUserId);
    const notFound = await app.inject({
      ...inject.propositionByUserId,
      url: '/propositions/users/2',
    });

    expect(successfullRequest.statusCode).toEqual(200);
    expect(await successfullRequest.json()).toEqual(expectedObjects.proposition);
    expect(notFound.statusCode).toEqual(404);
  });

  test('GET /propositions/slots - Get all Slots', async () => {
    const login = await app.inject(inject.login);
    const user = await login.json();
    inject.allSlots = {
      ...inject.allSlots,
      headers: { authorization: `Bearer ${user.token}` },
    };

    const filters_is_booked = await app.inject({
      ...inject.allSlots,
      query: 'filter[is_booked]=true',
    });
    const filters_is_booked_and_limit = await app.inject({
      ...inject.allSlots,
      query: 'filter[is_booked]=false&limit=2',
    });

    expect(filters_is_booked.statusCode).toEqual(200);
    expect(await filters_is_booked.json()).toEqual(expect.arrayContaining([expectedObjects.slot]));
    expect(filters_is_booked_and_limit.statusCode).toEqual(200);
    expect(await filters_is_booked_and_limit.json()).toHaveLength(2);
  });
  
  test('PUT /propositions/slots/book/:id - Book a slot with accessToken', async () => {
    const login = await app.inject(inject.login);
    const user = await login.json();  

    const bookSlotSuccess = await app.inject({
      method: 'PUT',
      url: `/propositions/slots/book/${res.slots[1].data.id}`,
      headers: { authorization: `Bearer ${user.token}` },
    });
    const bookSlotUnauthorized = await app.inject({
      method: 'PUT',
      url: `/propositions/slots/book/${res.slots[1].data.id}`
    });

    expect(bookSlotSuccess.statusCode).toEqual(200);
    expect(bookSlotUnauthorized.statusCode).toEqual(401);
  });

  test('PUT /propositions/slots/unbook/:id - Unbook a slot', async () => {
    const adminLogin = await app.inject(inject.loginAdmin);
    const userLogin = await app.inject(inject.login);
    const admin = await adminLogin.json();
    const user = await userLogin.json(); 

    const unbookSlotAsUser = await app.inject({
      method: 'PUT',
      url: `/propositions/slots/unbook/${res.slots[0].data.id}`,
      payload: { password: res.password },
      headers: { authorization: `Bearer ${user.token}` },
    });
    const unbookSlotAsAdmin = await app.inject({
      method: 'PUT',
      url: `/propositions/slots/unbook/${res.slots[0].data.id}`,
      payload: { password: res.password },
      headers: { authorization: `Bearer ${admin.token}` },
    });
    const unbookSlotFreeSlot = await app.inject({
      method: 'PUT',
      url: `/propositions/slots/unbook/${res.slots[0].data.id}`,
      payload: { password: res.password },
      headers: { authorization: `Bearer ${admin.token}` },
    });
    expect(unbookSlotAsUser.statusCode).toEqual(403);
    expect(unbookSlotAsAdmin.statusCode).toEqual(200);
    expect(unbookSlotFreeSlot.statusCode).toEqual(406);
  });
});
