import supertest from "supertest";
import Fastify from "fastify";
import app from "../src/app";

const fastify = Fastify();
fastify.register(app);
const request = supertest(fastify.server);

describe("GET /movies - handleGetMovies", () => {
  it("Should return all movies", async () => {
    const res = await request.get("/movies");
  });
});
