# Video Metadata API 📹

A video metadata management API that i built with **Node.js**, **TypeScript**, **Express**, and **Prisma (PostgreSQL)**.

---

## Features ✨

- Fetch video metadata from a given file path (via `ffmpeg`)
- Basic CRUD structure prepared for extension
- **JWT authentication** utility (token generation + middleware)
- **Prisma ORM** for database access
- Unit tests with **Jest** (sample test for video metadata)

---

## Setup 🛠️

```bash
# Clone the repo
git clone https://github.com/AnuOluwatomiwa/video-metadata-api
cd video-metadata-api

# Install dependencies
npm install

# Setup the database
npx prisma migrate dev --name init

# Run in development mode
npm run dev

## Authentication 🔑

JWT tokens can be generated using the utility:

```bash
node --loader ts-node/esm src/tokenTest.ts
Use the token in requests as:

Makefile

Authorization: Bearer <token>

## API Endpoints 🛣️
Method	Path	Description
POST	/api/videos/metadata	Fetches and returns video metadata.
POST /api/videos/metadata

Body: { "filePath": "path/to/video.mp4" }

Response: JSON metadata extracted with ffmpeg

(Other CRUD endpoints are scaffolded for extension.)

## Scripts ⚙️
Script	Command	Description
dev	npm run dev	Run development server with auto-reload.
build	npm run build	Build project into JavaScript (for production).
start	npm start	Start compiled project (production mode).
test	npm test	Run Jest unit tests.
Project Structure 📁
CSS

prisma/
  schema.prisma
src/
  controllers/
    videoController.ts
  middlewares/
    authMiddleware.ts
  routes/
    videoRoutes.ts
  utils/
    db.ts
    auth.ts
  app.ts
  server.ts
tests/
  video.test.ts
