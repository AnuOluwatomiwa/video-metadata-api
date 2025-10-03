import { Router } from "express";
import { getVideoMetadata, addVideo, getVideos, updateVideo, deleteVideo } from "../controllers/videoController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/metadata", getVideoMetadata);

// Protected CRUD endpoints
router.post("/", authMiddleware, addVideo);
router.get("/", authMiddleware, getVideos);
router.put("/:id", authMiddleware, updateVideo);
router.delete("/:id", authMiddleware, deleteVideo);

export default router;
