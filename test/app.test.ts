import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("CTEM vulnerable paths (intentional, localhost-only)", () => {
  it("serves the healthy demo status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("demonstrates IDOR: an unauthenticated request reads Bob's account", async () => {
    const response = await request(app).get("/api/accounts/acct-bob");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: "acct-bob",
      owner: "Bob Example",
      plan: "enterprise",
    });
  });

  it("demonstrates path traversal to the harmless private fixture", async () => {
    const response = await request(app)
      .get("/api/files")
      .query({ name: "../private/ctem-proof.txt" });

    expect(response.status).toBe(200);
    expect(response.text).toContain("CTEM-PROOF");
  });

  it("demonstrates reflected XSS by returning an unescaped script element", async () => {
    const payload = "<script>alert(document.domain)</script>";
    const response = await request(app)
      .get("/search")
      .query({ q: payload });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain(payload);
  });
});
