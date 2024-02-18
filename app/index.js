const app = require("./app");
const db = require("./models");

const port = process.env.PORT || 3000;

db.init().then(() => {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      app.listen(port, () => {
        console.log(`Application is listening on ${port}`);
      });
    })
    .catch((error) => {
      console.error("Unable to connect to database \n", error.stack);
    });
});
