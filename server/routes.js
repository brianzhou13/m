var cors = require('cors');
var utils = require('./utils');
// need to try cors

// regex found here: http://stackoverflow.com/questions/8426171/what-regex-will-match-all-loopback-addresses
// const corsOptions = {
// 	origin: /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/,
// 	credentials: true
// };

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/, //accepts calls from mixmax
  credentials: true
};


module.exports = (app, express) => {
	
	// the corsOptions should work with http://127.0.0.1 given the regex 
	app.get('/typeahead', cors(corsOptions), utils.typeahead);

	// let's not get this one setup yet. 
	// app.get('/resolver')
};