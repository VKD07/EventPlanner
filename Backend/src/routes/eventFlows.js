import express from 'express';
import { getEventFlowByEventID } from '../controllers/eventFlowController.js';

const router = express.Router();

router.post("/", getEventFlowByEventID);

export default router;