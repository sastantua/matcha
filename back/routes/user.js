import { Router } from 'express';
import fs from 'fs';
import bcrypt from 'bcryptjs';

import auth from '../middleware/auth';
import upload from '../middleware/pictures';

import { userExists, registerUser, sendActivation, findByCreditentials, generateAuthToken, logoutUser, logoutAll, editUser, savePicture, getPictures, verifyPicture, deletePicture, setLocation, getLocation, getToken, getPopularityScore, setAsProfilePicture, getByOrientation, hasExtendedProfile, match, sortByParams, like, unlike, isLiked, likes, getLikes, blocks, unblock, block, getBlocked, activateAccount, requestPassword, changePassword, editPassword, saw, hasSeen, editSaw, getSeen, regex, report } from '../models/user';
import { getGender, setGender, verifyGender } from '../models/gender';
import { getHobbies, setHobbies, verifyHobbies, userHasHooby, unsetHobby } from '../models/hobby';
import { ErrorHandler } from '../middleware/errors';
import { isEmpty, isEighteen } from '../models/utils';
import { getOrientation, verifyOrientation, setOrientation } from '../models/orientation';

const userRouter = Router();

userRouter.post('/register', async (req, res, next) => {
	try {
		const user = {
			email: req.body.email,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password
		}
		
		if (!user.email.match(regex.email) || !user.username.match(regex.username) || !user.password.match(regex.password)|| !user.firstname.match(regex.name) || !user.lastname.match(regex.name)) throw new ErrorHandler(400, 'Invalid required fields');
		if (await userExists(user)) throw new ErrorHandler(400, 'User already exists');
		await registerUser(user);
		await sendActivation(user, req.get('origin'));
		res.status(200).send();
	} catch (err) {
		next(err);
	}
});

userRouter.post('/verify/:token', async (req, res, next) => {
	try {
		const { token } = req.params;

		if (!await activateAccount(token)) throw new ErrorHandler(400, "Invalid Token");
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email.match(regex.email) || !password.match(regex.password)) throw new ErrorHandler(400, 'Invalid required fields');
		const user = await findByCreditentials(email, password);
		if (!user) throw new ErrorHandler(401, 'Login failed! Check authentication credentials');
		if (user.report) throw new ErrorHandler(401, 'Your account as been reported, contact an administrator');
		if (!user.activated) throw new ErrorHandler(401, 'Please activate your account');
		user.popularity = await getPopularityScore(user);
		const location = await getLocation(user);
		if (location) user.location = location;
		let token = await getToken(user);
		if (!token) token = await generateAuthToken(user);
		return res.status(200).json({ user, token });
	} catch (err) {
		next(err);
	}
});

userRouter.post('/forgot', async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email.match(regex.email)) throw new ErrorHandler(400, 'Invalid required fields');
		await requestPassword(email, req.get('origin'));
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/reset', async (req, res, next) => {
	try {
		const { token, password } = req.body;

		if (!password.match(regex.password) || !token) throw new ErrorHandler(400, 'Invalid required fields');
		if (!await changePassword(password, token)) throw new ErrorHandler(400, "Invalid Token");
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/edit', auth, async (req, res, next) => {
	try {
		const user = {
			email: req.body.email.match(regex.email) ? req.body.email : null,
			firstname: req.body.firstname.match(regex.name) ? req.body.firstname : null,
			lastname: req.body.lastname.match(regex.name) ? req.body.lastname : null,
			username: req.body.username.match(regex.username) ? req.body.username : null,
			biography: req.body.biography ? req.body.biography : null,
			birthdate: req.body.birthdate ? req.body.birthdate : null,
			proximity: req.body.proximity ? req.body.proximity : null,
		}
		if (isEmpty(user)) throw new ErrorHandler(400, "Invalid required fields");
		if (user.birthdate)
			if (!user.birthdate.match(/(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/g))
				throw new ErrorHandler(400, 'Date should be in format YYYY-MM-DD');
			else if (!isEighteen(user.birthdate))
				throw new ErrorHandler(400, 'You should be 18 Years Old to register');
		user._id = req.user._id;
		const editedUser = await editUser(user);
		return res.status(200).json({ user: editedUser });
	} catch (err) {
		next(err);
	}
})

userRouter.post('/editPassword', auth, async (req, res, next) => {
	try {
		const { old_password, new_password } = req.body;

		if (!old_password || !new_password.match(regex.password)) throw new ErrorHandler(400, "Invalid required field");
		
		if (!await bcrypt.compare(old_password, req.user.password)) throw new ErrorHandler(401, "Invalid creditentials");
		await editPassword(req.user, new_password);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.get('/me', auth, async (req, res) => {
	const location = await getLocation(req.user);
	delete req.user.password;
	req.user.popularity = await getPopularityScore(req.user);
	if (location) req.user.location = location;
	res.status(200).json(req.user);
})

userRouter.get('/gender', auth, async (req, res) => {
	const gender = await getGender(req.user);
	if (gender)
		return res.status(200).json(gender);
	else
		return res.status(200).send();
})

userRouter.get('/orientation', auth, async (req, res) => {
	const orientation = await getOrientation(req.user);
	if (orientation)
		return res.status(200).json(orientation);
	else
		return res.status(200).send();
})

userRouter.post('/gender', auth, async (req, res, next) => {
	try {
		const gender = req.body._id;
		if (!gender || !await verifyGender(gender)) throw new ErrorHandler(400, "Invalid required field");
		const actualGender = await getGender(req.user);
		if (actualGender._id != gender) await setGender(req.user, gender);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/orientation', auth, async (req, res, next) => {
	try {
		const orientation = req.body._id;
		if (!orientation || !await verifyOrientation(orientation)) throw new ErrorHandler(400, "Invalid required field");
		const actualOrientation = await getOrientation(req.user);
		if (actualOrientation._id != orientation) await setOrientation(req.user, orientation);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.get('/hobby', auth, async (req, res) => {
	const hobbies = await getHobbies(req.user);
	if (hobbies)
		return res.status(200).json(hobbies);
	else
		return res.status(200).send();
})

userRouter.post('/hobby', auth, async (req, res, next) => {
	try {
		const hobbies = req.body.hobbies;
		if (!hobbies.length || !await verifyHobbies(hobbies)) throw new ErrorHandler(400, "Invalid required field");

		await setHobbies(req.user, hobbies);
		return res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.delete('/hobby', auth, async (req, res, next) => {
	try {
		const hobby_id = req.body._id;
		if (!hobby_id || !await verifyHobbies([hobby_id]) || !await userHasHooby(req.user, hobby_id)) throw new ErrorHandler(400, "Invalid required field");

		await unsetHobby(req.user, hobby_id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/logout', auth, async (req, res) => {
	await logoutUser(req.token);
	res.status(200).json({ success: true });
})

userRouter.post('/logout/all', auth, async (req, res) => {
	await logoutAll(req.user);
	res.status(200).json({ success: true });
})

userRouter.post('/picture', [auth, upload.single('picture')], async (req, res, next) => {
	try {
		if (!req.file) throw new ErrorHandler(400, "Invalid required field");
		const dbPictures = await getPictures(req.user);
		if (dbPictures && dbPictures.length >= 5) {
			fs.unlinkSync(`./public/images/${req.file.filename}`);
			throw new ErrorHandler(400, "You can't upload more than 5 pictures");
		}
		const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		const picture = await savePicture(req.user, url, req.file.filename);

		res.status(200).json(picture);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/picture', auth, async (req, res, next) => {
	try {
		const pictures = await getPictures(req.user);
		res.status(200).json(pictures);
	} catch (err) {
		next(err);
	}
})

userRouter.delete('/picture', auth, async (req, res, next) => {
	try {
		const picture_id = req.body._id;
		if (!picture_id) throw new ErrorHandler(400, "Invalid required field");

		const picture_name = await verifyPicture(req.user, picture_id)
		if (!picture_name) throw new ErrorHandler(400, "Invalid picture id");

		fs.unlinkSync(`./public/images/${picture_name}`);
		await deletePicture(picture_id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/profile', auth, async (req, res, next) => {
	try {
		const { _id } = req.body;
		if (!_id) throw new ErrorHandler(400, 'Missing required field');
		if (!await setAsProfilePicture(req.user, _id)) throw new ErrorHandler(400, 'This picture does not exist');
		res.status(204).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/location', auth, async (req, res, next) => {
	try {
		const { lat, lng } = req.body;
		if (!lat || !lng) throw new ErrorHandler(400, "Invalid required field");

		const location = { lat, lng };
		const newLocation = await setLocation(req.user, location);
		res.status(200).json(newLocation);
	} catch (err) {
		next(err);
	}
})

userRouter.post('/report/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;

		await report(_id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.get('/likes', auth, async (req, res, next) => {
	try {
		const likes = await getLikes(req.user);
		res.status(200).json(likes);
	} catch (err) {
		next(err);
	}
})

userRouter.post('/like/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;

		await like(req.user, _id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/unlike/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;

		if (await isLiked(req.user, _id)) await unlike(req.user, _id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.get('/blocked', auth, async (req, res, next) => {
	try {
		const likes = await getBlocked(req.user);
		res.status(200).json(likes);
	} catch (err) {
		next(err);
	}
})

userRouter.post('/block/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;

		await block(req.user, _id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/unblock/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;

		if (await blocks(req.user, _id)) await unblock(req.user, _id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
})

userRouter.post('/saw/:_id', auth, async (req, res, next) => {
	try {
		const { _id } = req.params;
		await hasSeen(req.user, _id) ? await editSaw(req.user, _id) : await saw(req.user, _id);
		res.status(200).send();
	} catch (err) {

	}
})

userRouter.get('/saw', auth, async (req, res, next) => {
	try {
		const seen = await getSeen(req.user);
		res.status(200).json(seen);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/search', auth, async (req, res, next) => {
	try {
		if (!hasExtendedProfile(req.user)) throw new ErrorHandler(403, 'Please fill your extended profile');
		const { age, popularity, distance, hobbies } = req.body;
		const filters = { age, popularity, distance, hobbies };
		if (isEmpty(filters)) throw new ErrorHandler(400, 'You need at least one parameter');
		const users = sortByParams(req.user, await getByOrientation(req.user), filters);
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/match', auth, async (req, res, next) => {
	try {
		if (!await hasExtendedProfile(req.user)) throw new ErrorHandler(403, 'Please fill your extended profile');
		const users = await match(req.user);
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
})

userRouter.get('/contacts', auth, async (req, res, next) => {
	try {
		const likeList = await getLikes(req.user);
		likeList.filter(async like => await likes(req.user, like.user._id));
		const contacts = likeList.map(like => like.user);
		for (let contact of contacts) {
			contact.pictures = await getPictures(contact);
		}
		res.status(200).json(contacts);
	} catch (err) {
		next(err);
	}
})

export default userRouter;