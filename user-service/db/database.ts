import { Database } from "@cd/sqlite";

const db = new Database("users.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  );
`);

export default db;
