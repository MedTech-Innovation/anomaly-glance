import { createServer } from "./server";
import { env } from "./env";
import { initializeDatabase } from "./db/pool";

async function start() {
  try {
    await initializeDatabase();
    const app = createServer();
    app.listen(env.PORT, () => {
      console.log(`API listening on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

void start();


