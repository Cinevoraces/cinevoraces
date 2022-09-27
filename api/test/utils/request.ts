import supertest from "supertest";
import Fastify from "fastify";
import app from "../../src/app";

const fastify = Fastify();
fastify.register(app);
const request = supertest(fastify.server);

export default request;
