const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );

// datatable
  app.get(
    "/api/user/datatable",
    [authJwt.verifyToken],
    controller.getUsersForDataTable
  );

// change status
  app.post(
    "/api/user/changestatus",
    [authJwt.verifyToken],
    controller.changeStatus
  );

// delete user
  app.delete(
    '/api/user/:id',
    [authJwt.verifyToken],
    controller.deleteUser
  )

// get user data
  app.get(
    '/api/user/:id',
    [authJwt.verifyToken],
    controller.getUser
  )

// update user data
  app.put(
    '/api/user/:id',
    [authJwt.verifyToken],
    controller.updateUser
  )

// save new user
  app.post(
    '/api/user',
    [authJwt.verifyToken],
    controller.addUser
  )

// update profile
  app.put(
    '/api/profile',
    [authJwt.verifyToken],
    controller.updateProfile
  )

};