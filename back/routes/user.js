import { Router } from 'express';
import auth from '../middleware/auth';

import { userExists, registerUser, findByCreditentials, generateAuthToken, logoutUser, logoutAll } from '../models/user';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
	const user = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	}
	if (await userExists(user)) return res.status(400).json({message: 'user already exists'});
	
	registerUser(user);
	res.status(200).json({success: true});
});

userRouter.post('/login', async (req, res) => {
	const {email, password} = req.body;
	const user = await findByCreditentials(email, password);
	if (!user) return res.status(401).json({error: 'Login failed! Check authentication credentials'});
	const token = await generateAuthToken(user);
	return res.status(200).json({user, token});
});

userRouter.get('/me', auth, async (req, res) => {
	res.json(req.user);
})

userRouter.post('/logout', auth, async (req, res) => {
	await logoutUser(req.token);
	res.json({success: true});
})

userRouter.post('/logout/all', auth, async (req, res) => {
	await logoutAll(req.user);
	res.json({success: true});
})

export default userRouter;