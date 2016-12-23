var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = (app, express) => {

	// morgan
  app.use(morgan('dev'));

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://mixmax.com'); // used to be 8000
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

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