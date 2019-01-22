require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use(function(req, res, next){
	//should print as 'Error 404 not found'
	let err = new Error('Not found!');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
	console.log(`Server is starting on port ${PORT}`);
});
