function errorHandler(error, request, response, next){
	return response.status(error.status || 500).sjon({
		error: {
			//"or error 500"
			message:error.message || "Uh oh. Something has gone wrong."
		}
	});
}

module.exports = errorHandler;
