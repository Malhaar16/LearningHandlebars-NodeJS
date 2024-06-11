const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");  // Import the path module to handle directory paths
const customHelpers = require('./views/helpers/customHelpers');  // Require custom helpers

const sampleData = {
  user: { name: "John Doe", email: "john@example.com" },
  users: [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ],
  condition: false,
};

const app = express();

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views/layouts"),  // Correctly set the layoutsDir
    partialsDir: path.join(__dirname, "views/partials"),  // Correctly set the partialsDir
    helpers: customHelpers
  })
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));  // Ensure views directory is set

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    message: "Welcome to Handlebars with Express!",
  });
});

// if
app.get("/if", (req, res) => {
  res.render("if", { user: sampleData.user });
});
// unless
app.get("/unless", (req, res) => {
  res.render("unless", { condition: sampleData.condition });
});
// each
app.get("/each", (req, res) => {
  res.render("each", { users: sampleData.users });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
