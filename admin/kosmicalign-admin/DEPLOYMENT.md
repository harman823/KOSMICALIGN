# Vercel deployment

Deploy this `admin/kosmicalign-admin` directory as its own Vercel project.

Set these environment variables in Vercel:

- `ADMIN_PORTAL_PASSWORD`
- `BACKEND_API_URL` (ending in `/api/v1`)
- `BACKEND_ADMIN_KEY` (the same private value as the backend `ADMIN_KEY`)

The storefront contains no admin route. It can read public services and availability only; private client data and service management are available only through this admin application.
