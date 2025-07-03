const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const app = express();

app.get("/", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Servicio de Administración</title>
      </head>
      <body>
        <h1>Servicio de Administración</h1>
        <h2>Rutas disponibles:</h2>
        <ul>
          <li><a href="/admin/logs">/logs</a> - Ver logs de Nginx</li>
          <li><a href="/admin/metrics">/metrics</a> - Ver métricas de Docker</li>
        </ul>
      </body>
    </html>
  `);
});

app.get("/logs", (req, res) => {
  const log = fs.readFileSync("/var/log/nginx/access.log", "utf8");
  res.type("text/plain").send(log);
});

app.get("/metrics", (req, res) => {
  exec("docker stats --no-stream", (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.type("text/plain").send(stdout);
  });
});

app.listen(3000, () => console.log("Admin service running on port 3000"));