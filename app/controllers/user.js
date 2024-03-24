const db = require("../models");
const { publisher } = require("../utils");
const { logger } = require("../utils");
const { tokenHandler } = require("../utils");
const { validateSignup, validateUpdate } = require("./schemas");

module.exports = {
  get: async (req, res, next) => {
    return res.status(200).json(req.user);
  },

  post: async (req, res, next) => {
    const { error, value } = validateSignup(req.body);

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

      if (process.env.NODE_ENV == "test") {
        user.update({
          isEmailVerified: true,
        });
      } else {
        user.update({
          token: tokenHandler.tokenGenerate({ userId: user.id }, "180s"),
        });

        const payload = {
          token: user.token,
          email: user.username,
        };
        await publisher.publishMessage(payload);
      }

      delete user.dataValues.password;
      delete user.dataValues.token;

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
      const decodedToken = tokenHandler.verifyToken(token);
      const user = await db.User.findByPk(decodedToken.userId);

      await user.update({ isVerified: true, token: null });
      res.status(200).end();
    } catch (err) {
      logger.debug(err.message);
      next(err);
    }
  },
};
