const { Router } = require("express");
const { healthz, unhandledCase } = require("../controllers");
const {
  blockPayload,
  blockQueryParam,
  dbErrorHandler,
} = require("../middlewares");

const router = Router();

router.use(blockPayload);
router.use(blockQueryParam);

router.route("/").get(healthz.get).head(unhandledCase).all(unhandledCase);

router.use(dbErrorHandler);

module.exports = router;
