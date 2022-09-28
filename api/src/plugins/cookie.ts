import type { FastifyPluginCallback } from "fastify";
import fastifyCookie from "@fastify/cookie";
import plugin from "fastify-plugin";

const cookie: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  done();
};

export default plugin(cookie);
