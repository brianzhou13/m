var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = (app, express) => {

	// morgan
  app.use(morgan('dev'));

  app.use(function (req, res, next) {

    // check if req.url is equal to our MIXMAX PORT, and if not, then apply
    // the below settings.

  	// this now let's us activate multiple setHeaders 
  	// source: http://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-nodejs

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://mixmax.com'); // used to be 8000

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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