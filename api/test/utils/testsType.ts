import type { comparePassword, hashPassword } from '../../src/plugins/bcrypt';
import type { FastifyInstance } from 'fastify';
import type { user, proposition_slot, movie } from '../../src/types/_index';
import type { Client } from 'pg';
import type { faker } from '@faker-js/faker';

export interface server {
  app: FastifyInstance; 
  res: {
    users: Array<{ user: user, delete: ()=>void }>,
    slots: Array<{ slot: proposition_slot, delete: ()=>void }>,
    movies: Array<{ movie: movie, delete: ()=>void }>,
  },
  pgClient: Client,
  expectedObjects: Record<string, unknown>, 
  password: {
    default: string,
    comparePassword: typeof comparePassword,
    hashPassword: typeof hashPassword,
  },
  faker: typeof faker,
}
