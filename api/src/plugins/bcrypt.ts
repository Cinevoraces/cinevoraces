import type { FastifyPluginCallback } from 'fastify';
import bcrypt from 'bcryptjs';
import plugin from 'fastify-plugin';

/**
 * **Bcrypt**
 * @description
 * This plugin registers bcrypt methods.
 * It binds bcrypt methods to the request object.
 */
const bcryptPlugin: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.bcryptCompare || fastify.bcryptHash) 
    return fastify.log.warn('bcrypt plugin already registered');

  fastify
    .decorate('bcryptCompare', comparePassword)
    .decorate('bcryptHash', hashPassword)
    .decorateRequest('bcryptCompare', { getter: () => fastify.bcryptCompare })
    .decorateRequest('bcryptHash', { getter: () => fastify.bcryptHash });
  done();
};

/**
 * **comparePassword**
 * @description Compare a password with a hash.
 * @param pass_1 Password to compare
 * @param pass_2 Password to compare
 * @returns boolean
 */
const comparePassword = async (pass_1: string, pass_2: string) => {
  return await bcrypt.compare(pass_1, pass_2);
};

/**
 * **hashPassword**
 * @description Hash a password.
 * @param password Password to hash
 * @returns Hashed password
 */
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export default plugin(bcryptPlugin);
