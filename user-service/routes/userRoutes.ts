import { Router } from "@oak/oak/router";
import db from "../db/database.ts";

const router = new Router();

router.post("/users", async (ctx) => {
  const { name, age } = await ctx.request.body.json();

  if (typeof name !== "string" || typeof age !== "number") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Nombre o edad inválidos" };
    return;
  }

  try {
    const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
    stmt.run(name, age);
    ctx.response.status = 201;
    ctx.response.body = { message: "Usuario creado" };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Error en la base de datos" };
  }
});

router.get("/users", (ctx) => {
  const stmt = db.prepare("SELECT * FROM users");
  const result = stmt.all();
  ctx.response.status = 200;
  ctx.response.body = result;
});

router.get("/users/:id", (ctx) => {
  const id = ctx.params.id;
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const result = stmt.get(id);

  if (!result) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Usuario no encontrado" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = result;
});

export default router;
