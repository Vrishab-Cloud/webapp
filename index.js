const express = require("express");
const { json, urlencoded } = require("body-parser");
const { db } = require("./models");
const { router: defaultRouter } = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  next();
});

app.use(defaultRouter);

app.use((err, req, res, next) => {
  console.error("Error Handler: ", err.stack);
  return res.status(503).end();
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to database \n", error.stack);
  });
