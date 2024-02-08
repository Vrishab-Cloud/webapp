const get = async (req, res, next) => {
  return res.status(200).end();
};

const unhandledCase = async (req, res, next) => {
  return res.status(405).end();
};

module.exports = {
  get,
  unhandledCase,
};
