import type { FastifyPluginCallback } from "fastify";
import plugin from "fastify-plugin";

const envCheck: FastifyPluginCallback = async (fastify, opts, done) => {
  if (!process.env.JWT_SECRET) throw new Error("Env 'JWT_SECRET' not found.");
  if (!process.env.POSTGRES_URL) throw new Error("Env 'POSTGRES_URL' not found.");
  if (!process.env.PASS_REGEXP) throw new Error("Env 'PASS_REGEXP' not found.");
  if (!process.env.COOKIE_SECRET) throw new Error("Env 'COOKIE_SECRET' not found.");
  done();
};

export default plugin(envCheck);
