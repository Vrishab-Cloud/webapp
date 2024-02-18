const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

module.exports = {
  bcryptPassword: async (password) => {
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },
};
