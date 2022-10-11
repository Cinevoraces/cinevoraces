import { build } from "../helper";
import bcrypt from "bcrypt";
import createUser from "../utils/createUser";
import createMovie from "../utils/createMovies";
import createSlot from "../utils/createSlot";

describe("Users routes test", () => {
  const app = build();
  const slotObject = expect.objectContaining({
    id: expect.any(Number),
    season_number: expect.any(Number),
    episode: expect.any(Number),
    publishing_date: expect.any(String),
    is_booked: true,
  });
  const propositionObject = expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.any(Array),
    genres: expect.any(Array),
    release_date: expect.any(String),
    user_id: expect.any(Number),
    user_pseudo: expect.any(String),
    publishing_date: expect.any(String),
    presentation: expect.any(String),
  });

  const password = "password1234";
  let user: Awaited<ReturnType<typeof createUser>>
  let admin: Awaited<ReturnType<typeof createUser>>
  let slot: Awaited<ReturnType<typeof createSlot>>
  let freeSlot: Awaited<ReturnType<typeof createSlot>>
  let proposition: Awaited<ReturnType<typeof createMovie>>
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    });
    admin = await createUser({
      password: encryptedPassword,
      role: "admin",
    });
    slot = await createSlot({
      is_booked: true,
    });
    freeSlot = await createSlot({
      is_booked: false,
    });
    proposition = await createMovie(1, {
      is_published: false,
    });
  })

  afterAll(async () => {
    user.remove()
    admin.remove()
    slot.remove()
    freeSlot.remove()
    proposition.remove()
  })
  
  test("GET /propositions/slots?filter[is_booked]=true", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "GET",
      url: "/propositions/slots",
      query: "filter[is_booked]=true",
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([slotObject]));
  });

  test("GET /propositions/users", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "GET",
      url: "/propositions/users",
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([propositionObject]));
  });

  test("GET /propositions/users/:id", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/propositions/users/1",
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(propositionObject);
  });

  test("GET /propositions/users/:id", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/propositions/users/2",
    });

    expect(res.statusCode).toEqual(404);
  });

  test("PUT /propositions/slots/book/:id", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "PUT",
      url: `/propositions/slots/book/${freeSlot.data.id}`,
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });

    expect(res.statusCode).toEqual(200);
  });

  test("PUT /propositions/slots/unbook/:id Succes", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: admin.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "PUT",
      url: `/propositions/slots/unbook/${freeSlot.data.id}`,
      payload: { password },
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });

    expect(res.statusCode).toEqual(200);
  });
  
  test("PUT /propositions/slots/unbook/:id Unauthorized", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "PUT",
      url: `/propositions/slots/unbook/${freeSlot.data.id}`,
      payload: { password },
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });
    
    expect(res.statusCode).toEqual(403);
  });

  test("PUT /propositions/slots/unbook/:id un-reserved slot", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: admin.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "PUT",
      url: `/propositions/slots/unbook/${freeSlot.data.id}`,
      payload: { password },
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });
    
    expect(res.statusCode).toEqual(406);
  });
});
