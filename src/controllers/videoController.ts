import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import prisma from "../utils/db.ts";

// Existing metadata extractor
export const getVideoMetadata = (req: Request, res: Response) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "filePath is required" });
  }

  ffmpeg.ffprobe(filePath, (err, metadata) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(metadata);
  });
};

// POST /api/videos
export const addVideo = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, genre, tags } = req.body;
    const video = await prisma.video.create({
      data: { title, description, duration, genre, tags }
    });
    res.json(video);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/videos
export const getVideos = async (req: Request, res: Response) => {
  try {
    const { genre, tags, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const videos = await prisma.video.findMany({
      where: {
        genre: genre ? String(genre) : undefined,
        tags: tags ? { has: String(tags) } : undefined
      },
      skip,
      take: Number(limit)
    });

    res.json(videos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/videos/:id
export const updateVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const video = await prisma.video.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(video);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/videos/:id
export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.video.delete({ where: { id: Number(id) } });
    res.json({ message: "Video deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
