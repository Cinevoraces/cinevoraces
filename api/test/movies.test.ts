import { movie } from "@prisma/client";
import createMovie from "./utils/createMovies";
import { RessourceCreator } from "./utils/createRessource";

describe("GET /movie", () => {
  let movie: Awaited<RessourceCreator<movie>>;

  beforeAll(async () => {
    movie = await createMovie();
  });

  afterAll(async () => {
    movie.remove();
  });

  it("return one movie", async () => {
    expect.anything();
  });
});
