import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import bcrypt from 'bcrypt';
import expectedObject from '../expectedObjects';

describe('Movies routes test', () => {
  const { app, res } = build();
  const inject: Record<string, InjectOptions> = {
    login: { method: 'POST', url: '/login' },
    allMovies: { method: 'GET', url: '/movies' },
    movieById: { method: 'GET', url: '/movies/1' }
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(res.password, 10);
    res.users[0] = await res.createUser({ password: encryptedPassword });
    for (let i = 0; i < 5; i++) {
      res.movies[i] = await res.createMovie(res.users[0].data.id);
      res.reviews[i] = await res.createReview(res.users[0].data.id, res.movies[i].data.id);
    }
    inject.login = { 
      ...inject.login, 
      payload: { 
        pseudo: res.users[0].data.pseudo, 
        password: res.password 
      } 
    };
  });

  afterAll(async () => {
    res.users[0].remove();
  });

  test('GET /movies - Get all Movies', async () => {
    const getAllMovies = await app.inject({
      ...inject.allMovies 
    });
    const filters_user_id = await app.inject({
      ...inject.allMovies,
      query: 'filter[user_id]=1',
    });
    const wrongFiltersAsVisitor = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true',
    });
    const wrongFilters = await app.inject({
      ...inject.allMovies,
      query: 'filter[jambon]=true',
    });
    const filters_is_published_season_id = await app.inject({
      ...inject.allMovies,
      query: 'filter[is_published]=true&filter[season_id]=3&filter[bookmarked]=true',
    });
    
    expect(await getAllMovies.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(await filters_user_id.json()).toEqual(expect.arrayContaining([expectedObject.moviesFilteredByUserId]));
    expect(await wrongFiltersAsVisitor.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(await wrongFilters.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(await filters_is_published_season_id.json()).toEqual(expect.arrayContaining([expectedObject.moviesFilteredBySeason]));
  });
    
  test('TEST', async () => {
    const login = await app.inject(inject.login); 
    await app.inject({ 
      ...inject.allMovies,
      headers: { authorization: `Bearer ${await login.json().token}` },
      query: 'filter[bookmarked]=true',
    });
  });

  test.skip('GET /movies - Get all Movies as logged User', async () => {
    const login = await app.inject(inject.login);
    inject.allMovies = {
      ...inject.allMovies,
      headers: { authorization: `Bearer ${await login.json().token}` },
    };
    const emptyRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true',
    });
    
    res.reviews[0].update({ bookmarked: true, viewed: true, liked: true, rating: 5 });
    res.reviews[1].update({ bookmarked: true });
    res.reviews[2].update({ bookmarked: true, viewed: true });
    res.reviews[3].update({ liked: true });
    res.reviews[4].update({ liked: true, rating: 5 });
    
    const AllFiltersRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true&filter[viewed]=true&filter[liked]=true&filter[rating]=true',
    });
    const bookmarkedFilterRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true',
    });
    const viewedFilterRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[viewed]=true',
    });
    const likedAndRatedFilterRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[liked]=true&filter[rating]=true',
    });
    
    const emptyResLength = await emptyRes.json().length;
    const AllFiltersResLength = await AllFiltersRes.json().length;
    const bookmarkedFilterResLength = await bookmarkedFilterRes.json().length;
    const viewedFilterResLength = await viewedFilterRes.json().length;
    const likedAndRatedFilterResLength = await likedAndRatedFilterRes.json().length;
    expect(emptyResLength).toEqual(0);
    expect(AllFiltersResLength).toEqual(1);
    expect(bookmarkedFilterResLength).toEqual(3);
    expect(viewedFilterResLength).toEqual(2);
    expect(likedAndRatedFilterResLength).toEqual(2);
  });

  test('GET /movies/:id - Get one movie by id', async () => {
    const res = await app.inject(inject.movieById);
    expect(await res.json()).toEqual(expectedObject.movie);
  });
});
