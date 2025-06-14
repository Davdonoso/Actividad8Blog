// Creation and configuration of the Express APP
const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const dayjs = require("dayjs");

const app = express();
app.use(express.json());
app.use(cors());

// Middleware

app.use(async (req, res, next) => {
  const fechaActual = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const linea = `${fechaActual} ${req.method} ${req.url} ${req.ip}\n`;
  await fs
    .appendFile("logs.txt", linea)
    .then(() => {
      console.log("Log guardado");
    })
    .catch((err) => {
      console.error("Error al guardar el log", err);
    });
  next();
});

// Route configuration

app.use("/api", require("./routes/api.routes"));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
