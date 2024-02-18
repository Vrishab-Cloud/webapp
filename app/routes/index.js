const routes = {};

routes.healthz = require("./healthz");
routes.user = require("./user");

module.exports = routes;
