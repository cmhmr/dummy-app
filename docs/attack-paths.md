# Local attack paths

This proof of concept contains intentionally vulnerable handlers to demonstrate
how CTEM can connect an exposed route to vulnerable code and an observable
impact. It is a deliberately unsafe training sample, not production software.

## Run it safely

Use Node.js 22 or newer and pnpm:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm dev
```

The server binds only to `127.0.0.1:3000` (or the locally configured `PORT`).
Do not proxy it, expose it to a network, or test these payloads against systems
you do not own. The path traversal proof reads only the included harmless
`fixtures/private/ctem-proof.txt` sentinel.

## 1. IDOR — CWE-639

**Attack path:** `GET /api/accounts/:accountId` → caller-controlled account ID
→ account record returned without authentication or ownership checks.

```sh
curl --fail http://127.0.0.1:3000/api/accounts/acct-bob
```

The response contains Bob's seeded demo record. In a real application, replace
the direct lookup with authentication and authorization that verifies the
authenticated principal can access the requested account.

**Automated proof:** `demonstrates IDOR` in `test/app.test.ts`.

## 2. Path traversal — CWE-22

**Attack path:** `GET /api/files?name=...` → user-supplied path → path resolved
from `fixtures/public` without checking that the final path remains inside that
directory → private sentinel returned.

```sh
curl --fail --get \
  --data-urlencode 'name=../private/ctem-proof.txt' \
  http://127.0.0.1:3000/api/files
```

The response contains `CTEM-PROOF`. No host files or real secrets are needed
for this demonstration. In production, canonicalize the resolved path and
reject it unless it is contained within the intended public directory.

**Automated proof:** `demonstrates path traversal` in `test/app.test.ts`.

## 3. Reflected XSS — CWE-79

**Attack path:** `GET /search?q=...` → caller-controlled query string inserted
directly into an HTML response → browser parses attacker-controlled markup.

Open this URL in a browser running on the same machine:

```text
http://127.0.0.1:3000/search?q=%3Cscript%3Ealert(document.domain)%3C%2Fscript%3E
```

The harmless `alert` executes in that local page's origin. For a non-browser
check, use:

```sh
curl --fail --get \
  --data-urlencode 'q=<script>alert(document.domain)</script>' \
  http://127.0.0.1:3000/search
```

The response contains the unescaped script element. In production, render
untrusted content with context-aware output encoding or a safe templating
system; do not concatenate it into HTML.

**Automated proof:** `demonstrates reflected XSS` in `test/app.test.ts`.
