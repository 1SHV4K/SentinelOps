# ConfigGuard AI

Local configuration state demo: three isolated server containers expose validated state to a FastAPI backend over a private Compose network. Demo drift is allowlisted and can be reset. This phase does not detect baseline drift or persist scans.

## Start

Requirements: Python 3.11–3.12 for local development, Docker Engine, and Docker Compose v2.

```bash
cp .env.example .env
docker compose up --build -d --wait
```

The backend listens on `http://localhost:8000`. The simulated servers have no published host ports. `DEMO_MODE=true` in the example `.env` enables the predefined controls. Set it to `false` and recreate the services to disable them.

```bash
curl http://localhost:8000/api/health
curl http://localhost:8000/api/fleet/states
curl -X POST http://localhost:8000/api/fleet/server-03/simulate-drift \
  -H 'Content-Type: application/json' -d '{"scenario":"security_drift"}'
curl http://localhost:8000/api/fleet/states
curl -X POST http://localhost:8000/api/fleet/server-03/reset
curl http://localhost:8000/api/fleet/states
```

To stop the demo, run `docker compose down`.

## Tests and local API

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
pytest
ruff check .
ruff format --check backend fleet tests
```

The Docker integration smoke test runs automatically when Docker Engine and Compose v2 are available; otherwise pytest reports it as skipped. To run only non-Docker tests, use `pytest -m 'not integration'`.

For local backend development without the fleet, run `uvicorn backend.app.main:app --host 127.0.0.1 --port 8000`. Fleet collection then needs server URLs supplied in `FLEET_SERVERS`.
