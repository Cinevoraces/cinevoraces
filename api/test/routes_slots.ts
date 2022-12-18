import type TestServer from './TestServer';

export async function ROUTES_SLOTS(server: TestServer) {
  describe('SLOTS ENDPOINTS', () => {

    test('BOOK/UNBOOK SLOTS', async () => {
      const logUser = await server.RequestLogin({
        pseudo: server.ressources.users[0].pseudo,
        password: server.ressources.users[0].password.clear,
      });

      const GET_AVAILABLE_SLOTS = await server.RequestSlots(
        logUser.tokens.accessToken,
        'where[is_booked]=false'
      );
      expect(GET_AVAILABLE_SLOTS.res).toEqual(
        expect.arrayContaining(
          [expect.objectContaining({ is_booked: false })]
        )
      );

      const SUCCESSFULL_BOOK_SLOT = await server.RequestBookSlot(
        logUser.tokens.accessToken,
        server.ressources.slots[0].id
      );
      expect(SUCCESSFULL_BOOK_SLOT.statusCode).toEqual(204);

      // Admin unbook slot
      const logAdmin = await server.RequestLogin({
        pseudo: server.ressources.admins[0].pseudo,
        password: server.ressources.admins[0].password.clear,
      });

      const SUCCESSFULL_UNBOOK_SLOT = await server.RequestUnbookSlot(
        logAdmin.tokens.accessToken,
        server.ressources.slots[0].id,
        { password: server.ressources.admins[0].password.clear }
      );

      expect(SUCCESSFULL_UNBOOK_SLOT.statusCode).toEqual(204);
    });
  });
}
