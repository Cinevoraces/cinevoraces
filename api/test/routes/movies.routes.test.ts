import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import bcrypt from 'bcrypt';
import createUser from '../utils/createUser';
import createMovie from '../utils/createMovie';
import createReview from '../utils/createReview';

describe('Movies routes test', () => {
  const app = build();
  const movieObject = expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    user_id: expect.any(Number),
    season_id: expect.any(Number),
  });
  const password = 'password1234';
  let user: Awaited<ReturnType<typeof createUser>>;
  let movies: Awaited<ReturnType<typeof createMovie>>[];
  let reviews: Awaited<ReturnType<typeof createReview>>[];
  let loginUserInjectOptions: InjectOptions = {
    method: 'POST',
    url: '/login',
  };
  const getAllMoviesInjectOptions: InjectOptions = {
    method: 'GET',
    url: '/movies',
  };
  const getOneMovieInjectOptions: InjectOptions = {
    method: 'GET',
    url: '/movies/1',
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({ password: encryptedPassword });
    movies = [
      await createMovie(user.data.id),
      await createMovie(user.data.id),
      await createMovie(user.data.id),
      await createMovie(user.data.id),
      await createMovie(user.data.id),
    ];
    reviews = [
      await createReview(user.data.id, movies[0].data.id),
      await createReview(user.data.id, movies[1].data.id),
      await createReview(user.data.id, movies[2].data.id),
      await createReview(user.data.id, movies[3].data.id),
      await createReview(user.data.id, movies[4].data.id),
    ];
    loginUserInjectOptions = {
      ...loginUserInjectOptions,
      payload: { pseudo: user.data.pseudo, password },
    };
  });

  afterAll(async () => {
    user.remove();
  });

  // GET /movies
  test('Get All Movies', async () => {
    const res = await app.inject({ ...getAllMoviesInjectOptions });
    expect(await res.json()).toEqual(expect.arrayContaining([movieObject]));
  });

  test('Get movies with published/season filters', async () => {
    const res = await app.inject({
      ...getAllMoviesInjectOptions,
      query: 'filter[is_published]=true&filter[season_id]=3',
    });

    expect(await res.json()).toEqual(
      expect.arrayContaining([expect.objectContaining({
        is_published: true,
        season_id: 3,
      })]),
    );
  });

  test('Get movies with user id filter', async () => {
    const res = await app.inject({
      ...getAllMoviesInjectOptions,
      query: 'filter[user_id]=1',
    });

    expect(await res.json()).toEqual(
      expect.arrayContaining([expect.objectContaining({
        user_id: 1,
      })])
    );
  });

  test.skip('Get movies with user interaction filters', async () => {
    const login = await app.inject(loginUserInjectOptions);
    const loggedInjectOptions = {
      ...getAllMoviesInjectOptions,
      headers: { authorization: `Bearer ${await login.json().token}` },
    };
    
    const emptyRes = await app.inject({
      ...loggedInjectOptions,
      query: 'filter[bookmarked]=true',
    });
    const emptyResLength = await emptyRes.json().length;
    expect(emptyResLength).toEqual(0);

    reviews[0].update({ 
      bookmarked: true,
      viewed: true,
      liked: true,
      rating: 5,
    });
    reviews[1].update({ bookmarked: true });
    reviews[2].update({ bookmarked: true, viewed: true });
    reviews[3].update({ liked: true });
    reviews[4].update({ liked: true, rating: 5 });

    const AllFiltersRes = await app.inject({
      ...loggedInjectOptions,
      query: 'filter[bookmarked]=true&filter[viewed]=true&filter[liked]=true&filter[rating]=true',
    });
    const AllFiltersResLength = await AllFiltersRes.json().length;
    expect(AllFiltersResLength).toEqual(1);

    const bookmarkedFilterRes = await app.inject({
      ...loggedInjectOptions,
      query: 'filter[bookmarked]=true',
    });
    const bookmarkedFilterResLength = await bookmarkedFilterRes.json().length;
    expect(bookmarkedFilterResLength).toEqual(3);

    const viewedFilterRes = await app.inject({
      ...loggedInjectOptions,
      query: 'filter[viewed]=true',
    });
    const viewedFilterResLength = await viewedFilterRes.json().length;
    expect(viewedFilterResLength).toEqual(2);

    const likedAndRatedFilterRes = await app.inject({
      ...loggedInjectOptions,
      query: 'filter[liked]=true&filter[rating]=true',
    });
    const likedAndRatedFilterResLength = await likedAndRatedFilterRes.json().length;
    expect(likedAndRatedFilterResLength).toEqual(2);
  });

  test('Get all movies using unexisting filters', async () => {
    const res = await app.inject({
      ...getAllMoviesInjectOptions,
      query: 'filter[jambon]=true',
    });

    expect(await res.json()).toEqual(expect.arrayContaining([movieObject]));
  });

  // GET /movies/:id
  test('Get one movie by id', async () => {
    const res = await app.inject({ ...getOneMovieInjectOptions });
    expect(await res.json()).toEqual(movieObject);
  });
});
