import { Request, Response } from 'express';
}
};


export const getVideos = async (req: Request, res: Response) => {
try {
const { genre, tags, skip = 0, take = 10 } = req.query;
const where: any = {};
if (genre) where.genre = String(genre);
if (tags) where.tags = { has: String(tags) };


const videos = await prisma.video.findMany({
where,
skip: Number(skip),
take: Number(take),
});
res.json(videos);
} catch (error) {
res.status(500).json({ error: 'Failed to fetch videos' });
}
};


export const getVideo = async (req: Request, res: Response) => {
try {
const { id } = req.params;
const video = await prisma.video.findUnique({ where: { id: Number(id) } });
if (!video) return res.status(404).json({ error: 'Video not found' });
res.json(video);
} catch (error) {
res.status(500).json({ error: 'Failed to fetch video' });
}
};


export const updateVideo = async (req: Request, res: Response) => {
try {
const { id } = req.params;
const { title, description, duration, genre, tags } = req.body;
const video = await prisma.video.update({
where: { id: Number(id) },
data: { title, description, duration, genre, tags },
});
res.json(video);
} catch (error) {
res.status(500).json({ error: 'Failed to update video' });
}
};


export const deleteVideo = async (req: Request, res: Response) => {
try {
const { id } = req.params;
await prisma.video.delete({ where: { id: Number(id) } });
res.json({ message: 'Video deleted' });
} catch (error) {
res.status(500).json({ error: 'Failed to delete video' });
}
};