const logger = require("../utils").getLogger();

module.exports = {
  cacheController: (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
  },

  blockPayload: (req, res, next) => {
    const contentLength = req.get("Content-Length");
    const isRequestPayloadEmpty =
      !contentLength || parseInt(contentLength) == 0;

    if (!isRequestPayloadEmpty) {
      return res.status(400).end();
    }

    next();
  },

  blockQueryParam: (req, res, next) => {
    const containsQueryParams = Object.keys(req.query).length != 0;

    if (containsQueryParams) {
      return res.status(400).end();
    }

    next();
  },

  errorHandler: (err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return res.status(400).end();
    }
    logger.error("Error Handler: ", err.message);
    return res.status(503).end();
  },

  dbErrorHandler: (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeConnectionRefusedError":
        logger.error("DB Connectivity Issue: ", err.message);
        return res.status(503).end();
      case "SequelizeUniqueConstraintError":
        logger.warn("Username is not unique", err.message);
        return res.status(400).end();
      default:
        next(err);
    }
  },
};
