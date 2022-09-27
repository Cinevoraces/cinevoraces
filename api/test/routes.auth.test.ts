import request from "./utils/request";

const newUser = {
  email: "jambon4000@gmail.net",
  pseudo: "Jambonneau4000",
  password: "Lejamboncesttropbon1",
};

describe("POST /register - handleRegister", () => {
  it("Should register a new user", async () => {
    const response = await request.get("/register").send();
  });
});
