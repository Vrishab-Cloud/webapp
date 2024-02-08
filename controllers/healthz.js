const { db } = require("../models");

module.exports = {
  get: async (req, res, next) => {
    try {
      await db.sequelize.authenticate();
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  },
};
