import { FastifyReply, FastifyRequest } from "fastify";

type Movie = {
  name: string
}

const getMovie = async (request: FastifyRequest, reply:FastifyReply): Promise<Movie[]> => {
    const fastify = request.server
    try {
      const { rows } = await fastify.pg.query(`SELECT * FROM movie`)
      return rows
    } catch (error) {
      fastify.log.error(error)
    }
}

export { getMovie }