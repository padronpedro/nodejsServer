const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const routes = [];

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//db.sequelize.sync();
  /**
   * In development, you may need to drop existing tables and re-sync database. So you can use force: true as code above.
   * For production, just insert these rows manually and use sync() without parameters to avoid dropping data:
   */


// simple route
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to pedro server.",
    routes: JSON.stringify(routes, null, 2)
  });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app._router.stack.forEach(middleware => {
  if (middleware.route) {
    routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
  }
});


// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});