import {Router} from "express";
import { testThread, getAllThreads, getThread, deleteThread, newThread } from "../controllers/chatController.js";

const router = Router();

router.post('/test', testThread);
router.get('/thread', getAllThreads);
router.get('/thread/:threadId', getThread);
router.delete('/thread/:threadId' , deleteThread);
router.post('/chat', newThread);


export default router;