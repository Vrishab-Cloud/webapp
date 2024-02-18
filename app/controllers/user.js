const db = require("../models");
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

      delete user.dataValues.password;

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
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
