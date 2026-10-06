# DevOps: CI pipeline for a containerised Node.js API

A small Node.js calculator API used to practise the full build-test-package loop of a DevOps workflow: an automated CI pipeline on GitHub Actions and a container image built with Docker.

![CI](https://github.com/PedroCastro0507/DevOps/actions/workflows/pipeline.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

## What it shows

- **Continuous integration** on every push and pull request to `main`, defined in `.github/workflows/pipeline.yml`.
- **Automated smoke tests** against the running API: the pipeline starts the service, checks `GET /health` and verifies a `POST /calc` response.
- **Containerisation** with a small `node:20-alpine` image that installs production dependencies only, using `npm ci`.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Returns `{"status":"ok"}` when the service is up |
| POST | `/calc` | Calculates a result from `{"a": 5, "b": 3, "op": "add"}` |

The service listens on port `8000`.

## Run it locally

```bash
# with Node.js 20
cd src
npm ci
node app.js

# or with Docker
docker build -t calculadora-local .
docker run --rm -p 8000:8000 calculadora-local

curl http://localhost:8000/health
curl -X POST http://localhost:8000/calc \
  -H "Content-Type: application/json" \
  -d '{"a":5,"b":3,"op":"add"}'
```

## CI pipeline

1. Check out the repository.
2. Set up Node.js 20.
3. Install dependencies with `npm ci`.
4. Start the API in the background and wait for it to come up.
5. Smoke-test `/health` and `/calc`.
6. Build the Docker image.

## Next steps

- Push the image to a container registry from the pipeline.
- Add linting and unit tests as separate pipeline stages.
- Deploy to Kubernetes with a GitOps flow using ArgoCD.
