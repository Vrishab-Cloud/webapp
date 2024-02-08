const express = require("express");
const { json, urlencoded } = require("body-parser");
const { db } = require("./models");

const routes = require("./routes");
const { cacheController, errorHandler } = require("./middlewares");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(cacheController);

app.use("/healthz", routes.healthz);

app.use("/v1/user", routes.user);

app.use("/*", async (req, res, next) => {
  return res.status(404).end();
});

app.use(errorHandler);

db.checkDatabaseCreation().then(() => {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      app.listen(port, () => {
        console.log(`App is listening on port: ${port}`);
      });
    })
    .catch((error) => {
      console.error("Unable to connect to database \n", error.stack);
    });
});
