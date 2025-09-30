import { Router } from 'express';
import { addVideo, getVideos, getVideo, updateVideo, deleteVideo } from '../controllers/videoController';
import { authMiddleware } from '../middlewares/authMiddleware';


const router = Router();


router.post('/', authMiddleware, addVideo);
router.get('/', getVideos);
router.get('/:id', getVideo);
router.put('/:id', authMiddleware, updateVideo);
router.delete('/:id', authMiddleware, deleteVideo);


export default router;