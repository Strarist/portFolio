---
title: "A Production Docker Checklist Before You Deploy"
date: "2026-06-08"
summary: "Multi-stage builds, non-root users, health checks, and env validation — the Docker habits that prevent painful production surprises."
tags: ["Docker", "DevOps", "Production", "Kubernetes", "AWS"]
---

Docker makes local development easy. Production is where undisciplined containers fall apart: bloated images, root processes, missing health checks, and secrets baked into layers.

Here is the checklist I run before any service hits staging or production.

---

## Multi-stage builds are non-negotiable

Separate build dependencies from runtime. Your production image should not contain compilers, dev packages, or test runners.

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
USER node
CMD ["npm", "start"]
```

Smaller images pull faster, scan faster, and reduce attack surface.

---

## Run as a non-root user

Containers running as root are a security liability. Create a dedicated user in the Dockerfile and switch with `USER` before `CMD`.

If your platform (Kubernetes, ECS) enforces read-only root filesystems, plan writable paths (`/tmp`, upload dirs) explicitly.

---

## Health checks that mean something

A container "running" is not the same as a service "healthy." Add a `/health` endpoint that verifies critical dependencies when possible (database ping, cache reachability).

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8000/health || exit 1
```

Orchestrators use this signal to replace bad instances before users notice.

---

## Environment variables, not baked secrets

Never copy `.env` into the image. Inject configuration at runtime via:

- Vercel / Railway / Render env settings
- Kubernetes secrets and ConfigMaps
- AWS Parameter Store or Secrets Manager

Validate required env vars at startup and **fail fast** with a clear error message.

---

## Tag immutably, pin bases carefully

Use semantic version tags or Git SHA tags for releases. Avoid `:latest` in production pipelines — it makes rollbacks ambiguous.

Pin base image digests for high-compliance environments, or at minimum pin major versions and schedule base image updates deliberately.

---

## Pre-deploy checklist

- [ ] Multi-stage build, minimal runtime image
- [ ] Non-root user
- [ ] Health check endpoint wired
- [ ] Secrets injected at runtime
- [ ] `.dockerignore` excludes `.git`, `node_modules`, tests
- [ ] Logs go to stdout/stderr (12-factor)
- [ ] Resource limits set in orchestrator (CPU/memory)

Docker is not production-ready by default — but with these habits, it gets close.
