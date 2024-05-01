const express = require("express");
const { json, urlencoded } = require("body-parser");

const routes = require("./routes");
const { cacheController, errorHandler } = require("./middlewares");

const app = express();

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

module.exports = app;
