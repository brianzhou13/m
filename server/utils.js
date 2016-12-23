var sync = require('synchronize');
var request = require('request');
// var axios = require('axios');

module.exports = {
	typeahead: (req, res) => {
		console.log(`value for req.query is: ${req.query.text.trim()}`);

		// pulled from mixmax's github repo for initial start (?)
		var term = req.query.text.trim(); 
		if (!term) {
		  res.json([{ 
		    title: '<i>(enter a search term)</i>',
		    text: ''
		  }]);
		  return;
		}

		// need to make a post-req
		try {
			response = sync.await(request({
				url: 'http://127.0.0.1:1337/api/scrape/google/mixmax',
				method: 'POST',
				// http://127.0.0.1:1337/api/scrape/google/mixmax
				json: true,
			}, sync.defer()));

			console.log(`value for response is: ${response}`);
		} catch (e) {
			res.status(500).send('Error');
			return;
		}


	}
}