import { Router } from 'express';
import auth from '../middleware/auth';

import { retriveOrientations } from '../models/orientation';

const orientationRouter = Router();

orientationRouter.get('/', auth, async (req, res) => {
	const Orientations = await retriveOrientations();
	res.status(200).json(Orientations);
})

export default orientationRouter;