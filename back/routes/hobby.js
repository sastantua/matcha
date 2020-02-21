import { Router } from 'express';
import auth from '../middleware/auth';

import { retriveHobbies, addHobby } from '../models/hobby';
import { ErrorHandler } from '../middleware/errors';

const hobbyRouter = Router();

hobbyRouter.get('/', auth, async (req, res) => {
	const Hobbies = await retriveHobbies();
	res.status(200).json(Hobbies);
})

hobbyRouter.post('/', auth, async (req, res, next) => {
	try {
		const hobby = req.body.name;
		if (!hobby) throw new ErrorHandler(400, 'Missing require field');

		const newHobby = await addHobby(hobby);
		res.status(200).json(newHobby);
	} catch(err) {
		next(err);
	}
})

export default hobbyRouter;