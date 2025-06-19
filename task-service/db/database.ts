import { Database } from "@cd/sqlite";

const db = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    user_id INTEGER,
    state TEXT DEFAULT 'pendiente' CHECK ( state in ( 'pendiente', 'en_progreso', 'completada'))
  );
`);

export default db;
