const { logger } = require("../utils");

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
    switch (err.name) {
      case "TokenExpiredError":
        logger.debug("TokenExpiredError: ", err);
        return res.status(400).end();
      case "JsonWebTokenError":
        logger.debug("TokenWebTokenError: ", err);
        return res.status(400).end();
    }
    logger.error("Error Handler: ", err);
    return res.status(503).end();
  },

  dbErrorHandler: (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeConnectionRefusedError":
        logger.error("DB Connectivity Issue: ", err);
        return res.status(503).end();
      case "SequelizeUniqueConstraintError":
        logger.warn("Username is not unique: ", err);
        return res.status(400).end();
      default:
        next(err);
    }
  },
};
