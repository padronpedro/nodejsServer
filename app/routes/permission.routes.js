const { authJwt } = require("../middlewares");
const controller = require("../controllers/permission.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // get all user roles
  app.get(
    '/api/permission/all',
    [authJwt.verifyToken],
    controller.getPermissions
  )

};