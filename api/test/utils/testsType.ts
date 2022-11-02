import type { comparePassword, hashPassword } from '../../src/utils/bcryptHandler';
import type { FastifyInstance } from 'fastify';
import type { Database } from '../../src/types/Database';
import type { Client } from 'pg';
import type { faker } from '@faker-js/faker';

export interface server {
  app: FastifyInstance; 
  res: {
    users: Array<{ user: Database.user, delete: ()=>void }>,
    slots: Array<{ slot: Database.proposition_slot, delete: ()=>void }>,
    movies: Array<{ movie: Database.movie, delete: ()=>void }>,
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
