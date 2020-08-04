const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
require('./app/routes/role.routes')(app);
require('./app/routes/permission.routes')(app);
  
app._router.stack.forEach(middleware => {
    if (middleware.route) {
      routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
    }
});

module.exports = app;
