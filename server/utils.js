var request = require('request');
var Bluebird = require('bluebird');
var axios = require('axios');
// var sync = require('synchronize');


module.exports = {
	typeahead: (req, res) => {
		// pulled from mixmax's github repo for initial start (?)
		var term = req.query.text.trim(); 
		if (!term) {
		  res.json([{ 
		    title: '<i>(enter a search term)</i>',
		    text: ''
		  }]);
		  return;
		}

		var response = new Bluebird((resolve, reject) => {
			var result = axios.post(`http://127.0.0.1:1337/api/scrape/google/mixmax`, {
					query: term
				})
				.then((entries) => {
					//entries are resolved here
					resolve(entries.data);
				})
				.catch((err) => {
					console.log(`error retrieving results-- err: ${err}`);
					reject(err);
				});
		})
		.then((entries) => {
			// console.log(`keys for entries received: ${Object.keys(entries)}`);
			var results = entries.map((item) => {
				return { // we can do some in-line styling for this too...
					title: `<p> <p>Position ${item.position}:</p><p>url: ${item.url}</p><p>${item.meta}</p></p>`, // placed inside a '<li> tag'
					text: item._id.toString() + ':' + item.query// this is entered into the data-params value in the html, and the datat sent to resolver
				};
			});

			res.json(results);
			return;
		})
		.catch((err) => {
			console.log(`error in retrieving entries: ${err}`);
		});
	},

	resolver: (req, res) => {
		// console.log(`resolver value received is: ${req.query.text.trim()}`);// input is a query
		var queries = req.query.text.trim().split(':');
		var term_id = queries[0];
		var term = queries[1];

		// majority parts copied from above... not really DRY
		var response = new Bluebird((resolve, reject) => {
			var result = axios.post(`http://127.0.0.1:1337/api/scrape/google/mixmax`, {
					query: term
				})
				.then((entries) => {
					//entries are resolved here
					resolve(entries.data);
				})
				.catch((err) => {
					console.log(`error retrieving results-- err: ${err}`);
					reject(err);
				});
		})
		.then((items) => {
			// console.log(`value for item received is: ${item}`); // undefined
			var result = items.filter((item) => {
				return item._id === term_id;
			});
			
			var result = result[0];

			// var result = result
			res.json({
				body: `<p><p>Position ${result.position}:</p> <p>url: ${result.url}</p><p>${result.meta}</p></p>`
			});
		})
		.catch((err) => {
			console.log(`error in our resolver: ${err}`);
		});
	}
};