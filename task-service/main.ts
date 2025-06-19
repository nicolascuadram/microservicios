import { Application } from "@oak/oak/application";
import mainRoutes from "./routes/mainRoutes.ts";
import taskRoutes from "./routes/taskRoutes.ts";

const app = new Application();
const port = Number(Deno.env.get("PORT")) ?? 9090;

app.use(mainRoutes.routes());
app.use(mainRoutes.allowedMethods());
app.use(taskRoutes.routes());
app.use(taskRoutes.allowedMethods());

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port: port });
