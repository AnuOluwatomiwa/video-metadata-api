import { Router } from "express";
import { getVideoMetadata } from "../controllers/videoController.ts";

const router = Router();

router.post("/metadata", getVideoMetadata);

export default router;
