import { Database } from "@cd/sqlite";

const path = Deno.env.get("DATABASE_PATH") ?? "./data/users.db";
const db = new Database(path);

db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);

export default db;
