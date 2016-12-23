var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = (app, express) => {

	// morgan
  app.use(morgan('dev'));

	// bodyparser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));

	// add in middleware here
	// a logger middleware to check to see waht each request is
	app.use(function(req, res, next) {
	  console.log('[LOGGER @ MIDDLEWARE.JS] handling request for: ' + req.url);
	  next();
	});
}