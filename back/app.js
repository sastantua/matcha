import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import 'dotenv/config';

import { handleError } from './middleware/errors';
//import socket from './middleware/socket';

import userRouter from './routes/user';
import genderRouter from './routes/gender';
import hobbyRouter from './routes/hobby';
import orientationRouter from './routes/orientation';

var app = express();

//socket;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

app.use('/user', userRouter);
app.use('/gender', genderRouter);
app.use('/orientation', orientationRouter);
app.use('/hobby', hobbyRouter);

app.use(handleError)

module.exports = app;