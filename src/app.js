const express = require("express");
const app = express();
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

app.use(express.json());

// Note: app.use
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
