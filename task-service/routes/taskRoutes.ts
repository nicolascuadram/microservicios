import { Router } from "@oak/oak/router";
import db from "../db/database.ts";

const router = new Router();

router.post("/tasks", async (ctx) => {
  const { title, user_id } = await ctx.request.body.json();

  if (typeof title !== "string") {
    ctx.response.status = 400;
    ctx.response.body = { error: "Título inválido" };
    return;
  }

  try {
    const res = await fetch(`http://user-service:8080/users/${user_id}`);
    if (!res.ok) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Usuario no encontrado" };
      return;
    }
  } catch (err) {
    console.error(err);
    ctx.response.status = 502;
    ctx.response.body = { error: "No se pudo contactar con user-service" };
    return;
  }

  try {
    const stmt = db.prepare("INSERT INTO task (title, user_id) VALUES (?, ?)");
    stmt.run(title, Number(user_id));
    ctx.response.status = 201;
    ctx.response.body = { message: "Tarea creada" };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Error en la base de datos" };
  }
});

router.get("/tasks", async (ctx) => {
  const user_id = ctx.request.url.searchParams.get("user_id");

  if (user_id) {
    try {
      const res = await fetch(`http://user-service:8080/users/${user_id}`);
      if (!res.ok) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Usuario no encontrado" };
        return;
      }
    } catch (err) {
      console.error(err);
      ctx.response.status = 502;
      ctx.response.body = { error: "No se pudo contactar con user-service" };
      return;
    }

    const stmt = db.prepare("SELECT * FROM task WHERE user_id = ?");
    const result = stmt.all(Number(user_id));
    ctx.response.status = 200;
    ctx.response.body = result;
    return;
  }

  const stmt = db.prepare("SELECT * FROM task");
  const result = stmt.all();
  ctx.response.status = 200;
  ctx.response.body = result;
});

router.get("/tasks/:id", (ctx) => {
  const id = ctx.params.id;
  const stmt = db.prepare("SELECT * FROM task WHERE id = ?");
  const result = stmt.get(Number(id));

  if (!result) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Tarea no encontrada" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = result;
});

router.put("/tasks/:id", async (ctx) => {
  const id = ctx.params.id;
  const { state } = await ctx.request.body.json();

  try {
    const stmt = db.prepare("UPDATE task SET state = ? WHERE id = ?");
    stmt.run(state, Number(id));
    ctx.response.status = 201;
    ctx.response.body = { message: "Estado actualizado" };
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Error en la base de datos" };
  }
});

export default router;
