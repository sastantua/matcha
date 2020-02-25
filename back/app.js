import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import 'dotenv/config';

import { handleError} from './middleware/errors';

import { generateGenders, generateHobbies, generateOrientations, isEighteen } from './models/utils';

import userRouter from './routes/user';
import genderRouter from './routes/gender';
import hobbyRouter from './routes/hobby';
import orientationRouter from './routes/orientation';
import { getByOrientation } from './models/user';

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

generateGenders();
generateHobbies();
generateOrientations();

app.use('/user', userRouter);
app.use('/gender', genderRouter);
app.use('/orientation', orientationRouter);
app.use('/hobby', hobbyRouter);

getByOrientation({"_id": "ef636310-57fa-11ea-af8d-b938470e11ac"});

app.use(handleError)

module.exports = app;