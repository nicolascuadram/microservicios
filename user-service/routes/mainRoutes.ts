import { Router } from "@oak/oak/router";
import db from "../db/database.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head>
        <title>user-service</title>
      <head>
      <body>
        <h1>API de usuarios</h1>
      </body>
    </html>
  `;
});

router.get("/health", (ctx) => {
  try {
    const stmt = db.prepare("SELECT 1");
    stmt.get();
    ctx.response.status = 200;
    ctx.response.body = {
      status: "ok",
      database: "connected",
    };
  } catch (_err) {
    ctx.response.status = 500;
    ctx.response.body = {
      status: "error",
      database: "disconnected",
    };
  }
});

export default router;
