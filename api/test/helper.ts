import Fastify from "fastify";
import plugin from "fastify-plugin";
import App from "../src/app";

export function build() {
  const app = Fastify();

  beforeAll(async () => {
    void app.register(plugin(App));
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}
