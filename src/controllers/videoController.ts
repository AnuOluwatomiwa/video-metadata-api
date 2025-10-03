import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";

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
