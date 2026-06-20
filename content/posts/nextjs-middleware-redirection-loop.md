---
title: "Solving Next.js Middleware & Express Session Redirection Loops"
date: "2026-06-17"
summary: "Debugging expired tokens in Next.js applications. A deep dive into why checking cookie existence in middleware leads to infinite redirect loops, and how to safely synchronize state via backend headers."
tags: ["Next.js", "Express.js", "Authentication", "Middleware", "Debugging"]
---

Redirection loops are some of the most frustrating frontend bugs to troubleshoot, often leaving users staring at a blank page with a loading spinner. 

During the product validation pass of **CloudVault**, we uncovered and resolved a critical authentication loop. Here is an analysis of the issue, the root cause, and how to prevent it.

---

### The Architecture Setup

CloudVault splits authentication responsibilities across the frontend and backend:
* **Next.js Frontend Middleware** (`middleware.ts`): Intercepts incoming requests to protect `/dashboard`. It checks for the existence of the `token` cookie. If it exists, it allows access; otherwise, it redirects to `/login`.
* **Express Backend REST API**: Authenticates API requests hitting `/auth/me` by checking and decoding the JWT token inside the cookie.

```
[Browser Request] ──> [Next.js Middleware] ──(Cookie Exists?)──> [Dashboard Page]
                                                                        │
                                                                   (GET /auth/me)
                                                                        │
                                                                        ▼
[Browser Redirect] <──(Middleware Redirects) <── [401 Unauthorized] ── [Express Backend]
```

---

### The Bug: An Infinite Loop

When a user's session expired (or if the token cookie was tempered or invalid), the following sequence of events occurred:

1. The browser navigated to `/dashboard`.
2. The Next.js middleware observed that the `token` cookie was present, so it allowed the request to proceed.
3. The dashboard page mounted and fired a `/auth/me` fetch request to retrieve profile details.
4. The Express backend received the request, attempted to verify the JWT, and failed (expired/invalid).
5. The backend responded with `401 Unauthorized`.
6. The frontend store reacted to the `401` response by clearing local user state and redirecting the browser to `/login`.
7. The Next.js middleware intercepted the request to `/login`, saw that the `token` cookie *still existed* in the browser, and redirected the request back to `/dashboard` to prevent logged-in users from seeing the login screen.
8. Back on `/dashboard`, the page mounted, fired another `/auth/me` request, received a `401`, and redirected to `/login`, initiating the loop.

---

### The Fix: Immediate Cookie Purging on Validation Failure

The core issue was that the cookie existed in the browser but was invalid. The frontend had no way of knowing the cookie was invalid until it queried the backend, but the middleware didn't query the backend (to avoid slow network round-trips on every page transition).

To break this circle, the backend must take ownership of clearing the cookie as soon as it determines the token is invalid:

```typescript
// src/middleware/auth.ts
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Authentication token missing.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    // CRITICAL: Force the browser to delete the cookie immediately
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
};
```

---

### Key Takeaways
1. **Synchronize Cookie States**: Never check only for cookie existence on the client without a mechanism to invalidate it.
2. **Backend-First Purging**: The backend must purge invalid cookies upon verification failure using `res.clearCookie`.
3. **Decouple Redirect Guard**: Ensure the middleware allows public access routes (like `/login`) without immediately redirecting back to `/dashboard` if a cookie exists but is not validated.
