import { Router } from 'express';

import auth from '../middleware/auth';

import { getHistory } from '../models/chat';

const chatRouter = Router();

chatRouter.get('/history', auth, async (req, res, next) => {
	try {
		const history = await getHistory(req.user);
		res.status(200).json(history);
	} catch (err){
		next(err);
	}
})

export default chatRouter;