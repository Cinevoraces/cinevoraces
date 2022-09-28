import { build } from "../helper";

describe("Movies routes test", () => {
  const app = build();

  test("default root route", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/movies",
    });

    expect(res.statusCode).toEqual(200);
  });
});
