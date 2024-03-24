const { Router } = require("express");

const router = Router();
const { user, unhandledCase } = require("../controllers");
const { basicAuth, notAuth, checkVerified } = require("../middlewares/user");
const {
  blockQueryParam,
  dbErrorHandler,
  blockPayload,
} = require("../middlewares");

router.all("/verify", notAuth);
router.route("/verify").get(user.verify).all(unhandledCase);

router.use(blockQueryParam);

router.all("/", notAuth);
router.all("/self", basicAuth, checkVerified);

router.route("/").post(user.post).head(unhandledCase).all(unhandledCase);

router
  .route("/self")
  .get(blockPayload, user.get)
  .put(user.put)
  .head(unhandledCase);

router.use(dbErrorHandler);

module.exports = router;
