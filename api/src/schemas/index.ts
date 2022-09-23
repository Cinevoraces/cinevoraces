import movieSchema from "./movie";
import plugin from "fastify-plugin"
import { FastifyPluginCallback } from "fastify";

const schemasRegister: FastifyPluginCallback = async (fastify, opts, done) => {

  const schemas = [movieSchema]

  schemas.forEach((schema) => {
    fastify.addSchema(schema)
    })
  done()
}

export default plugin(schemasRegister)