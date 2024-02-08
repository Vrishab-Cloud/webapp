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
    console.error("Error Handler: ", err);
    return res.status(503).end();
  },

  dbErrorHandler: (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeConnectionRefusedError":
        console.error("DB Connectivity Issue: ", err);
        return res.status(503).end();
      case "SequelizeUniqueConstraintError":
        console.error("Username is not unique", err);
        return res.status(400).end();
      default:
        next(err);
    }
  },
};
