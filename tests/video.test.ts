import request from 'supertest';
import app from '../src/app.ts';
import prisma from '../src/utils/db';

let token: string;

beforeAll(async () => {
  // Generate a test token using the same secret
  const jwt = require('jsonwebtoken');
  token = jwt.sign({ id: 1, email: 'test@test.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await prisma.video.deleteMany();
  await prisma.$disconnect();
});

describe('Video API', () => {
  let videoId: number;

  // POST /videos
  it('should create a new video', async () => {
    const res = await request(app)
      .post('/api/videos')
      .set('Authorization', token)
      .send({
        title: 'Test Video',
        description: 'Sample description',
        duration: 120,
        genre: 'Documentary',
        tags: ['education', 'history'],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    videoId = res.body.id;
  });

  it('should fail to create video without auth', async () => {
    const res = await request(app)
      .post('/api/videos')
      .send({ title: 'No Auth Video', duration: 100, genre: 'Drama', tags: [] });
    expect(res.statusCode).toBe(401);
  });

  // GET /videos
  it('should fetch videos with pagination', async () => {
    const res = await request(app).get('/api/videos?skip=0&take=5');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should filter videos by genre', async () => {
    const res = await request(app).get('/api/videos?genre=Documentary');
    expect(res.statusCode).toBe(200);
    res.body.forEach((video: any) => {
      expect(video.genre).toBe('Documentary');
    });
  });

  // GET /videos/:id
  it('should fetch single video', async () => {
    const res = await request(app).get(`/api/videos/${videoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', videoId);
  });

  it('should return 404 for invalid video id', async () => {
    const res = await request(app).get('/api/videos/9999');
    expect(res.statusCode).toBe(404);
  });

  // PUT /videos/:id
  it('should update video metadata', async () => {
    const res = await request(app)
      .put(`/api/videos/${videoId}`)
      .set('Authorization', token)
      .send({ title: 'Updated Title', duration: 150, genre: 'History', tags: ['education'] });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should fail to update non-existing video', async () => {
    const res = await request(app)
      .put('/api/videos/9999')
      .set('Authorization', token)
      .send({ title: 'Does not exist', duration: 200, genre: 'Drama', tags: [] });
    expect(res.statusCode).toBe(500);
  });

  // DELETE /videos/:id
  it('should delete video', async () => {
    const res = await request(app)
      .delete(`/api/videos/${videoId}`)
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Video deleted');
  });

  it('should fail to delete non-existing video', async () => {
    const res = await request(app)
      .delete('/api/videos/9999')
      .set('Authorization', token);
    expect(res.statusCode).toBe(500);
  });
});