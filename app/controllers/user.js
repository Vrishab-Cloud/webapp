const db = require("../models");
const { publisher, verifyToken } = require("../utils");
const { logger } = require("../utils");
const { validateSignup, validateUpdate } = require("./schemas");

module.exports = {
  get: async (req, res, next) => {
    return res.status(200).json(req.user);
  },

  post: async (req, res, next) => {
    const { error, value } = validateSignup(req.body);
    const link = "v1/user/verify";
    if (error) {
      return res.status(400).end();
    }

    try {
      const user = await db.User.create({
        firstName: value.firstName,
        lastName: value.lastName,
        password: value.password,
        username: value.email,
      });

      const email = await db.Email.create({
        userId: user.id,
      });

      if (process.env.NODE_ENV == "test") {
        user.update({
          isEmailVerified: true,
        });
      } else {
        const payload = {
          token: email.id,
          email: user.email,
          link: link,
        };
        await publisher.publishMessage(payload);
      }

      delete user.dataValues.password;

      logger.info("User Created: " + user.username);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
  put: async (req, res, next) => {
    const { error, value } = validateUpdate(req.body);
    if (error) {
      return res.status(400).end();
    }
    try {
      await db.User.update(value, {
        individualHooks: true,
        where: {
          username: req.user.username,
        },
      });

      logger.info("User Updated: " + req.user.username);
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
  verify: async (req, res, next) => {
    const token = req.query.token;

    if (token == null) return res.status(400).end();
    try {
      const email = await db.Email.findByPk(token);

      if (email == null || !email.expireAt) return res.status(400).end();

      if (verifyToken(email.expireAt, "120000")) return res.status(410).end();

      const user = await db.User.findByPk(email.userId);

      await user.update({ isEmailVerified: true });
      res.status(200).end();
    } catch (err) {
      logger.debug(err.message);
      next(err);
    }
  },
};
