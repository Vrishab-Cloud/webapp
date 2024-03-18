const db = require("../models");
const logger = require("../utils").getLogger();

module.exports = {
  get: async (req, res, next) => {
    try {
      await db.sequelize.authenticate();
      logger.info("Database is healthy");
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
};
