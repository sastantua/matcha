import consola from "consola";

class ErrorHandler extends Error {
	constructor(statusCode, message) {
	  super();
	  this.statusCode = statusCode;
	  this.message = message;
	}
}

const handleError = (err, req, res, next) => {
	if (err instanceof ErrorHandler) {
		consola.error(err.message);
		const { statusCode, message } = err;
		res.status(statusCode).json({
		status: "error",
		statusCode,
		message
		});
	}
	else {
		consola.error(err);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

export {
	ErrorHandler,
	handleError
};