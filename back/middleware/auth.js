import jwt from 'jsonwebtoken';
import { verifyUser } from '../models/user';

const auth = async (req, res, next) => {
	var token = req.header('Authorization')
	if (req.header('Authorization')) token = req.header('Authorization').replace('Bearer ', '');
	else return res.status(401).json({ error: 'Not authorized to access this resource' });
    const data = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {return err ? false : decoded});
	if (!data) return res.status(401).json({ error: 'Not authorized to access this resource' })
    const user = await verifyUser(data._id, token);
    if (!user) res.status(401).send({ error: 'Not authorized to access this resource' })
    req.user = user;
    req.token = token;
    next();
}

export default auth;