let logger = (log, message, info) => {
	if (process.env.NODE_ENV !== 'test')
	  log.info(info, message)
}

export default logger;