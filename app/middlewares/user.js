const db = require("../models");

module.exports = {
  // https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

  basicAuth: async (req, res, next) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      return res.status(401).end();
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    try {
      const user = await db.User.findOne({
        where: { username: username },
      });

      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).end();
      }

      delete user.dataValues.password;
      delete user.dataValues.token;
      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  notAuth: async (req, res, next) => {
    if (req.headers.authorization) {
      return res.status(400).end();
    }

    next();
  },

  checkVerified: async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.isEmailVerified) {
        return res.status(401).end();
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};
