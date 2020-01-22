const logErrors = (err, req, res, next) => {
	console.error(err.stack);
	next(err);
};

const clientErrorHandler = (err, req, res, next) => {
	if (req.xhr) {
		res.status(500).send({ error: 'Fatal error' });
	} else {
		next(err);
	}
};

const errorHandler = (err, req, res, next) => {
	res.status(500);
	res.render('error', { error: err });
};

export {
	logErrors,
	clientErrorHandler,
	errorHandler
};