#!/usr/bin/env node
import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const host = "127.0.0.1";
const server = createApp().listen(port, host, () => {
  console.log(`CTEM demo listening at http://${host}:${port}`);
});

function stop(): void {
  server.close((error) => {
    if (error) {
      console.error("Failed to stop CTEM demo cleanly", error);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", stop);
process.once("SIGTERM", stop);
