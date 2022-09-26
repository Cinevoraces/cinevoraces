import type { FastifyPluginCallback } from "fastify";
import movieSchema from "./movie";
import userSchema from "./user";
import reviewSchema from "./review";

import plugin from "fastify-plugin";

const schemasRegister: FastifyPluginCallback = async (fastify, opts, done) => {
  const schemas = [movieSchema, userSchema, reviewSchema];

  schemas.forEach((schema) => {
    fastify.addSchema(schema);
  });
  done();
};

export default plugin(schemasRegister);
