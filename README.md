# CTEM Reachability PoC

A localhost-only Node.js + TypeScript + Express app for demonstrating how a
CTEM workflow can connect exposed HTTP routes to reachable vulnerable code and
observable impact. The app includes three intentional OWASP-style flaws:

- IDOR (CWE-639)
- Path traversal (CWE-22)
- Reflected XSS (CWE-79)

These flaws are for controlled demonstration only. **Do not deploy this app to
the public internet or use the payloads against systems you do not own.** The
server binds only to `127.0.0.1`; the traversal test targets an included,
harmless sentinel file.

## Requirements and commands

Requires Node.js 22+ and pnpm 12.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
pnpm dev
```

The app listens at `http://127.0.0.1:3000`. Set `PORT` to select a different
local port. See [docs/attack-paths.md](docs/attack-paths.md) for each route's
reachability path, harmless local exploit steps, and remediation guidance.

## Publish to GitHub Packages

The `Publish package` GitHub Actions workflow runs on tags matching `v*`.
It checks that the tag matches `package.json`, runs tests, type-checks and
builds the package, then publishes `@cmhmr/ctem-reachability-poc` to
`https://npm.pkg.github.com`.

To publish a release:

1. Bump the version in `package.json` and regenerate `pnpm-lock.yaml`.
2. Push the commit and a matching version tag, for example `v1.0.0`.
3. Ensure the repository's Actions settings permit workflows to write
   packages; the workflow requests `packages: write`.

Consumers need GitHub Packages read access and npm authentication configured
for the `@cmhmr` scope. The published package includes the compiled app,
fixtures, and attack-path documentation.
