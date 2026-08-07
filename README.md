# cpim-api-app

CPIM device communication layer (simulated protocol I/O).

## Role

Reads device definitions from `cpim-app-content`, simulates poll/write over each protocol, and reports faults to `cpim-app-contentgeneration`.

## Prerequisites

- `cpim-app-content` on port 3003
- `cpim-app-contentgeneration` on port 3004

## Run

```bash
npm install
npm run dev
```

Listens on `http://localhost:3002`.

## Endpoints

- `GET /health`
- `GET /devices` — definitions + live simulated values
- `GET /devices/:id/status` — poll tags (may raise exceptions)
- `POST /devices/:id/write` — `{ "tag", "value" }`

## Environment

- `PORT` (default `3002`)
- `CONTENT_URL` (default `http://localhost:3003`)
- `EXCEPTIONS_URL` (default `http://localhost:3004`)

## Status

v0.1.1 — active development (simulated protocol I/O).

## Roadmap

See [ROADMAP.md](ROADMAP.md) for this service’s 3-year track.
