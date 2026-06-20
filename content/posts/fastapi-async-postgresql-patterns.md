---
title: "FastAPI + PostgreSQL Async Patterns That Actually Scale"
date: "2026-06-12"
summary: "A practical guide to structuring async FastAPI services with SQLAlchemy 2.0, connection pooling, and request-scoped sessions — patterns I use in production backends."
tags: ["FastAPI", "PostgreSQL", "Python", "Backend", "Async"]
---

Most FastAPI tutorials stop at `async def` route handlers and a single database URL. Production backends need disciplined session management, predictable pooling, and clear boundaries between I/O-bound work and CPU-bound work.

This post covers the async patterns I rely on when building APIs that serve real traffic.

---

## Start with async SQLAlchemy 2.0

Use the async engine and session factory explicitly. Keep engine creation at application startup, not per request.

```python
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)

SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
```

**pool_pre_ping** avoids stale connections after idle periods — a small setting that prevents confusing 500s in deployed environments.

---

## Request-scoped sessions via dependency injection

Inject a session per request and always close it in a `finally` block.

```python
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

Routes stay thin: validate input, call a service, return a schema. Heavy logic belongs in service modules, not in `@app.get` handlers.

---

## Avoid blocking the event loop

FastAPI is async, but **not everything should run inside the event loop**. CPU-heavy work (PDF parsing, large embedding batches, image processing) should go to:

- A background worker (Celery, RQ, or a dedicated microservice)
- `asyncio.to_thread()` for short, isolated CPU tasks

If you block the loop, latency spikes for **every** concurrent request — not just the slow one.

---

## N+1 queries still happen in async code

Async does not magically fix ORM misuse. Use `selectinload` or explicit joins for related data.

```python
from sqlalchemy.orm import selectinload

stmt = select(User).options(selectinload(User.projects))
result = await session.execute(stmt)
users = result.scalars().all()
```

Profile with logging middleware before optimizing. Most backend slowness I have debugged was N+1, not Python itself.

---

## Takeaways

- One async engine at startup, pooled and pre-pinged
- Sessions scoped per request with commit/rollback discipline
- Keep routes thin; push domain logic to services
- Never run heavy CPU work on the event loop
- Watch for ORM N+1 even in async stacks

These patterns are boring — and that is exactly why they ship reliably.
