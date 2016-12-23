var cors = require('cors');
var utils = require('./utils');

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/, //accepts calls from mixmax
  credentials: true
};


module.exports = (app, express) => {

	/*
	 * @route name: /typeahead
	 * @input: user input attached as a query string parameter
	 * @output: an json obj with a `title` and `text` property that contains html of what's to be inserted when user types
	 * @notes: n/a
	 */
	app.get('/typeahead', cors(corsOptions), utils.typeahead);

	/*
	 * @name: /resovler
	 * @input: user's selection of the choices displayed from list generated from the /typeahead route
	 * @output: an json obj with a `body` property that contains html of what's to be inserted
	 * @notes: - code isn't 100% DRY as parts were directly copied from above -- a future clean-up.
	 * 	       - also we'd need to look into how to add styling 
	 */
	app.get('/resolver', cors(corsOptions), utils.resolver);

};