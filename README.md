# Video Metadata API

A scalable video metadata management API built with **Node.js**, **TypeScript**, **Express**, and **Prisma (PostgreSQL)**.

## Features
- Add, update, fetch, and delete video metadata
- Filtering by genre, tags
- Pagination support
- JWT authentication
- Prisma ORM for database access
- Unit tests with Jest
- (Bonus) Redis caching + Swagger documentation

## Setup

```bash
git clone <your-repo-url>
cd video-metadata-api
npm install
npx prisma migrate dev --name init
npm run dev
