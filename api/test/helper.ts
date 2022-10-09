import Fastify from "fastify";
import plugin from "fastify-plugin";
import qs from "qs";
import parseOptions from "../src/utils/parseOptions";
import App from "../src/app";

export function build() {
  const app = Fastify({
    querystringParser: (str) => qs.parse(str, parseOptions),
  });

  beforeAll(async () => {
    void app.register(plugin(App));
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}
