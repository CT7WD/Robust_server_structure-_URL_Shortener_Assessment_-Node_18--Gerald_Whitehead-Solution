const express = require("express");
const app = express();
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

app.use(express.json());

// Note: app.use
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

// 'NOT FOUND' HANDLER
app.use((request, response, next) => {
  next({status : 404,
        message : `Not found: ${request.originalUrl}`});
});

// ERROR HANDLER
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
