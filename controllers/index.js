const healthz = require("./healthz");
const user = require("./user");

const unhandledCase = async (req, res, next) => {
  return res.status(405).end();
};

module.exports = { healthz, user, unhandledCase };
