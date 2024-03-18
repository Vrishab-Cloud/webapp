const app = require("./app");
const db = require("./models");

const logger = require("./utils").getLogger();

const port = process.env.PORT || 3000;

db.init().then(() => {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      app.listen(port, () => {
        logger.info(`Application is listening on ${port}`);
      });
    })
    .catch((error) => {
      logger.error("Unable to connect to database \n", error.message);
    });
});
