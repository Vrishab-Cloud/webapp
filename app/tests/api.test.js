const app = require("../app");
const db = require("../models");
const request = require("supertest");

beforeAll(async () => {
  await db.init();
  await db.sequelize.sync({ force: true });
});

const userBody = {
  firstName: "vrishab",
  lastName: "shetty",
  email: "shetty@gmail.com",
  password: "password",
};

test("Test 1 - Create an account and Validate using Get", async () => {
  const postRes = await request(app)
    .post("/v4/user")
    .send(userBody)
    .set("Accept", "application/json")
    .expect("Cache-Control", /no-store, no-cache, must-revalidate/)
    .expect(201);

  delete postRes.body.account_created;
  delete postRes.body.account_updated;

  const getRes = await request(app)
    .get("/v4/user/self")
    .auth(userBody.email, userBody.password)
    .expect("Cache-Control", /no-store, no-cache, must-revalidate/)
    .expect(200);

  delete getRes.body.account_created;
  delete getRes.body.account_updated;

  expect(postRes.body).toEqual(getRes.body);
});

test("Test 2 - Update an account and Validate using Get", async () => {
  const updatedUserBody = {
    firstName: "Vicky",
    lastName: "Grivar",
    password: "newpassword",
  };

  const putRes = await request(app)
    .put("/v4/user/self")
    .auth(userBody.email, userBody.password)
    .send(updatedUserBody)
    .set("Accept", "application/json")
    .expect("Cache-Control", /no-store, no-cache, must-revalidate/)
    .expect(204);

  const getRes = await request(app)
    .get("/v4/user/self")
    .auth(userBody.email, updatedUserBody.password)
    .expect("Cache-Control", /no-store, no-cache, must-revalidate/)
    .expect(200);

  expect(updatedUserBody.firstName).toEqual(getRes.body.firstName);
  expect(updatedUserBody.lastName).toEqual(getRes.body.lastName);
});

afterAll(async () => {
  await db.close();
});
