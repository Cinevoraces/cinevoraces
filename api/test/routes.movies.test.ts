import request from "./utils/request";

describe("GET /movies - handleGetMovies", () => {
  it("Should return all movies", async () => {
    const res = await request.get("/movies");
  });
});
