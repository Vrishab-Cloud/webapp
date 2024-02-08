// const { v4: uuidv4 } = require("uuid");
// const { db } = require("../models");

// const id = uuidv4();

// beforeAll(async () => {
//   await db.checkDatabaseCreation();
//   await db.sequelize.sync({ force: true });
// });

// test("create user", async () => {
//   expect.assertions(1);

//   const user = await db.User.create({
//     id: id,
//     firstName: "James",
//     lastName: "Bond",
//     username: "jamebond@domain.name.com",
//     password: "Im the best",
//     account_created: new Date(),
//     account_updated: new Date(),
//   });

//   expect(user.id).toEqual(id);
// });

// test("get user", async () => {
//   expect.assertions(2);
//   const user = await db.User.findByPk(id);
//   expect(user.firstName).toEqual("James");
//   expect(user.lastName).toEqual("Bond");
// });

// afterAll(async () => {
//   await db.sequelize.close();
// });

test("sample test", async () => {
  expect.assertions(1);
  expect(1 + 1).toBe(2);
});
