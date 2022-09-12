import { FastifyReply, FastifyRequest } from "fastify";

const getMovie = async (request: FastifyRequest, reply:FastifyReply) => {
    const fastify = request.server
    try {
      const { rows } = await fastify.pg.query(`SELECT * FROM movi`)
      return rows
    } catch (error) {
      fastify.log.error(error)
    }
}

export { getMovie }