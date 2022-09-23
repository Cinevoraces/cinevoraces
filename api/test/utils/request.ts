import supertest from "supertest";
import createServer from "../../src/server";

const request = supertest(createServer());

export default request;
