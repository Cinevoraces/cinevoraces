import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('USERS ENDPOINTS', () => {
  const { app, res, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    login: { 
      method: 'POST',
      url: '/login',
    },
    getMovies: { 
      method: 'GET',
      url: '/movies',
    },
    postProposition: { 
      method: 'POST',
      url: '/movies',
    },
    putProposition: { 
      method: 'PUT',
      url: '/movies/:id',
    },
    publishMovie: { 
      method: 'PUT',
      url: '/movies/publish/:id',
    },
    deleteMovie: { 
      method: 'DELETE',
      url: '/movies/:id',
    }
  };

  test('GET MOVIES', async () => {
    // TODO: Write tests
  });

  test('MOVIE PROPOSITION', async () => {
    // TODO: Write tests
  });

  test('UPDATE MOVIE PROPOSITION', async () => {
    // TODO: Write tests
  });

  test('PUBLISH MOVIE PROPOSITION AS ADMIN', async () => {
    // TODO: Write tests
  });

  test('DELETE MOVIE AS ADMIN', async () => {
    // TODO: Write tests
  });
});
