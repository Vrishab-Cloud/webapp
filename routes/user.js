const { Router } = require("express");

const router = Router();
const { user, unhandledCase } = require("../controllers");
const { basicAuth, notAuth } = require("../middlewares/user");
const { blockQueryParam, dbErrorHandler } = require("../middlewares");

router.use(blockQueryParam);

router
  .route("/")
  .post(notAuth, user.post)
  .head(notAuth, unhandledCase)
  .all(notAuth, unhandledCase);

router.use(basicAuth);

router
  .route("/self")
  .get(user.get)
  .put(user.put)
  .head(unhandledCase)
  .all(unhandledCase);

router.use(dbErrorHandler);

module.exports = router;
