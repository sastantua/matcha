import jwt from 'jsonwebtoken';
import { verifyUser } from '../models/user';
import { ErrorHandler } from './errors';

const auth = async (req, res, next) => {
	try {
		var token = req.header('Authorization');

		if (req.header('Authorization')) token = req.header('Authorization').replace('Bearer ', '');
		else throw new ErrorHandler(401, 'Not authorized to access this resource');

		const data = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {return err ? false : decoded});
		if (!data) throw new ErrorHandler(401, 'Not authorized to access this resource');

		const user = await verifyUser(data._id, token);
		if (!user) throw new ErrorHandler(401, 'Not authorized to access this resource');
		
		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		next(err);
	}
}

export default auth;