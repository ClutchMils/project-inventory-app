const express = require("express");
const path = require("node:path");
const app = express();

const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");

// Tell Express to use EJS as the view engine
app.set("view engine", "ejs");

// Specify the directory where your EJS views are stored
app.set("views", path.join(__dirname, "views"));

// Middleware to parse POST form submissions
app.use(express.urlencoded({ extended: true }));

// Home page redirect or rendering
app.get("/", (req, res) => res.redirect("/categories"));

// Mount Routers
app.use("/categories", categoryRouter);
app.use("/items", itemRouter);

// app.js
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}`);
});
/*
const PORT = 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Inventory app - listening on port ${PORT}!`);
});
*/
