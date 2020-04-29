import { Router } from 'express';

import auth from '../middleware/auth';

import { getNotifications } from '../models/notification';

const notificationRouter = Router();

notificationRouter.get('/', auth, async (req, res, next) => {
	try {
		const notifications = await getNotifications(req.user._id);
		res.status(200).json(notifications);
	} catch (err){
		next(err);
	}
})

export default notificationRouter;