import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('SLOTS ENDPOINTS', () => {
  const { app, res, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    login: { 
      method: 'POST',
      url: '/login',
    },
    getSlots: {
      method: 'GET',
      url: '/slots',
    },
    bookSlot: {
      method: 'PUT',
      url: '/slots/book/:id'
    },
    unbookSlot: {
      method: 'PUT',
      url: '/slots/unbook/:id',
    },
  };

  test('GET SLOTS', async () => {
    // GET ALL SLOTS WITHOUT TOKEN
    const getAllSlotsFail = await app.inject(inject.getSlots);
    expect(getAllSlotsFail.statusCode).toEqual(401);

    // LOG USER
    inject.login = {
      ...inject.login,
      payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
    };
    const loginUser = await app.inject(inject.login);
    const { token: userToken } = await loginUser.json();
    
    inject.getSlots = {
      ...inject.getSlots,
      headers: { authorization: `Bearer ${userToken}` },
    };
    // GET ALL SLOTS
    const getAllSlots = await app.inject(inject.getSlots);
    expect(await getAllSlots.json()).toEqual(expect.arrayContaining([expectedObjects.slot]));

    // GET SLOTS FILTERED BY ID
    const getSlotById = await app.inject({
      ...inject.getSlots,
      url: '/slots?where[id]=1'
    });
    expect(await getSlotById.json()).toEqual(expect.arrayContaining([expect.objectContaining({ id: 1 })]));

    // GET SLOTS FILTERED BY BOOKED STATUS
    const getSlotByStatus = await app.inject({
      ...inject.getSlots,
      url: '/slots?where[is_booked]=false'
    });
    expect(await getSlotByStatus.json()).toEqual(expect.arrayContaining([expect.objectContaining({ is_booked: false })]));
  });

  test('BOOK SLOT', async () => {
    // LOG USER
    inject.login = {
      ...inject.login,
      payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
    };
    const loginUser = await app.inject(inject.login);
    const { token: userToken } = await loginUser.json();

    // BOOK SLOT WITH SUCCESS
    inject.bookSlot = {
      ...inject.bookSlot,
      headers: { authorization: `Bearer ${userToken}` },
    };
    const bookSlotSuccess = await app.inject({
      ...inject.bookSlot,
      url: `/slots/book/${res.slots[0].slot.id}`,
    });
    expect(bookSlotSuccess.statusCode).toEqual(200);

    // BOOK UNAVAILABLE SLOT
    const bookSlotFail = await app.inject({
      ...inject.bookSlot,
      url: `/slots/book/${res.slots[0].slot.id}`,
    });
    expect(bookSlotFail.statusCode).toEqual(401);
  });

  test('UNBOOK SLOT', async () => {
    // LOG USER
    inject.login = {
      ...inject.login,
      payload: { pseudo: res.users[1].user.pseudo, password: res.users[1].user.password },
    };
    const loginUser = await app.inject(inject.login);
    const { token: userToken } = await loginUser.json();

    // LOG ADMIN
    inject.login = {
      ...inject.login,
      payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
    };
    const loginAdmin = await app.inject(inject.login);
    const { token: adminToken } = await loginAdmin.json();

    // UNBOOK SLOT AS USER
    inject.unbookSlot = {
      ...inject.unbookSlot,
      url: `/slots/unbook/${res.slots[0].slot.id}`,
      headers: { authorization: `Bearer ${userToken}` },
    };
    const unbookSlotFail = await app.inject(inject.unbookSlot);
    expect(unbookSlotFail.statusCode).toEqual(403);

    // UNBOOK SLOT AS ADMIN
    const unbookSlotNoPassword = await app.inject({
      ...inject.unbookSlot,
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect(unbookSlotNoPassword.statusCode).toEqual(401);

    inject.unbookSlot = {
      ...inject.unbookSlot,
      headers: { authorization: `Bearer ${adminToken}` },
      payload: { password: res.users[0].user.password },
    };

    const unbookSlotSuccess = await app.inject(inject.unbookSlot);
    expect(unbookSlotSuccess.statusCode).toEqual(200);

    const unbookSlotFreeSlot = await app.inject(inject.unbookSlot);
    expect(unbookSlotFreeSlot.statusCode).toEqual(406);
  });
});
