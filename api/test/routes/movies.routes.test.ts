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
    const limit_10_results = await app.inject({
      ...inject.allMovies, 
      query: 'limit=10',
    });
    const limit_10_results_length = await limit_10_results.json().length;
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
      query: 'filter[is_published]=true&filter[season_id]=3',
    });
    const sort_desc = await app.inject({
      ...inject.allMovies,
      query: 'filter[is_published]=true&filter[season_id]=3&desc=publishing_date&limit=5',
    });
    const sort_desc_res = await sort_desc.json();
    const testArray = sort_desc_res.sort((
      a: Record<string, Date>, 
      b: Record<string, Date>
    ) => {
      const dateA = new Date(a.publishing_date);
      const dateB = new Date(b.publishing_date);
      return dateB.getTime() - dateA.getTime();
    });

    expect(await getAllMovies.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(limit_10_results_length).toEqual(10);
    expect(await filters_user_id.json()).toEqual(expect.arrayContaining([expectedObject.moviesFilteredByUserId]));
    expect(await wrongFiltersAsVisitor.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(await wrongFilters.json()).toEqual(expect.arrayContaining([expectedObject.movie]));
    expect(await filters_is_published_season_id.json()).toEqual(expect.arrayContaining([expectedObject.moviesFilteredBySeason]));
    expect(testArray === sort_desc_res).toEqual(true);
  });

  test('GET /movies - Get all Movies as logged User', async () => {
    const login = await app.inject(inject.login);
    inject.allMovies = {
      ...inject.allMovies,
      headers: { authorization: `Bearer ${await login.json().token}` },
    };
    const bookmarkedNotFound = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true',
    });
    
    await res.reviews[0].update({ bookmarked: true, viewed: true, liked: true, rating: 5 });
    await res.reviews[1].update({ bookmarked: true });
    await res.reviews[2].update({ bookmarked: true, viewed: true });
    await res.reviews[3].update({ liked: true });
    await res.reviews[4].update({ liked: true, rating: 1 });
    
    const AllFiltersRes = await app.inject({
      ...inject.allMovies,
      query: 'filter[bookmarked]=true&filter[viewed]=true&filter[liked]=true&filter[rating]=5',
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
      query: 'filter[liked]=true&filter[rating]=5',
    });
    
    const AllFiltersResLength = await AllFiltersRes.json().length;
    const bookmarkedFilterResLength = await bookmarkedFilterRes.json().length;
    const viewedFilterResLength = await viewedFilterRes.json().length;
    const likedAndRatedFilterResLength = await likedAndRatedFilterRes.json().length;
    expect(await bookmarkedNotFound.json()).toEqual(expectedObject.error);
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
