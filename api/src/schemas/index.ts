import type { FastifyPluginCallback } from "fastify";
import movieSchema from "./movie";
import plugin from "fastify-plugin";

const schemasRegister: FastifyPluginCallback = async (fastify, opts, done) => {
  const schemas = [movieSchema];

  schemas.forEach((schema) => {
    fastify.addSchema(schema);
  });
  done();
};

export default plugin(schemasRegister);
