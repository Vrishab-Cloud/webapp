const { Router } = require("express");
const { get, unhandledCase } = require("../controllers");

const router = Router();

router.use((req, res, next) => {
  const contentLength = req.get("Content-Length");
  const isRequestPayloadEmpty = !contentLength || parseInt(contentLength) == 0;
  const containsQueryParams = Object.keys(req.query).length != 0;

  if (!isRequestPayloadEmpty || containsQueryParams) {
    return res.status(400).end();
  }

  next();
});

router.head("/healthz", unhandledCase);

router.get("/healthz", get);

router.all("/*", unhandledCase);

module.exports = { router };
