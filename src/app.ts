import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";

const publicFilesDirectory = fileURLToPath(
  new URL("../fixtures/public/", import.meta.url),
);

const accounts: Record<
  string,
  { id: string; owner: string; plan: string }
> = {
  "acct-alice": { id: "acct-alice", owner: "Alice Example", plan: "starter" },
  "acct-bob": { id: "acct-bob", owner: "Bob Example", plan: "enterprise" },
};

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.get("/api/accounts/:accountId", (request, response) => {
    // INTENTIONAL IDOR (CWE-639): the caller can choose any account ID.
    const account = accounts[request.params.accountId];

    if (!account) {
      response.status(404).json({ error: "Account not found" });
      return;
    }

    response.json(account);
  });

  app.get("/api/files", async (request, response, next) => {
    const name = request.query.name;
    if (typeof name !== "string" || name.length === 0) {
      response.status(400).json({ error: "Query parameter 'name' is required" });
      return;
    }

    // INTENTIONAL PATH TRAVERSAL (CWE-22): no containment check keeps this
    // resolved path inside publicFilesDirectory.
    const filePath = resolve(publicFilesDirectory, name);
    try {
      const contents = await readFile(filePath, "utf8");
      response.type("text/plain").send(contents);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        response.status(404).json({ error: "File not found" });
        return;
      }
      next(error);
    }
  });

  app.get("/search", (request, response) => {
    const query = request.query.q;
    if (typeof query !== "string") {
      response.status(400).type("text/plain").send("Query parameter 'q' is required");
      return;
    }

    // INTENTIONAL REFLECTED XSS (CWE-79): query is inserted into HTML unescaped.
    response
      .type("html")
      .send(`<!doctype html><html><body><h1>Search results for: ${query}</h1></body></html>`);
  });

  return app;
}
