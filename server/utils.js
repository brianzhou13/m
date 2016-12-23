var request = require('request');
var Bluebird = require('bluebird');
var axios = require('axios');
// var sync = require('synchronize');


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


		var response;

		var response = new Bluebird((resolve, reject) => {
			var result = axios.post(`http://127.0.0.1:1337/api/scrape/google/mixmax`, {
				query: term
			})
				.then((entries) => {
					//entries are resolved here
					console.log(`value for json.parse: ${JSON.parse(entries.data)}`);
					resolve(JSON.parse(entries.data));
				})
				.catch((err) => {
					console.log(`error retrieving results-- err: ${err}`);
					reject(err);
				});
		})
		.then((entries) => {
			// console.log(`keys for entries received: ${Object.keys(entries)}`);
			console.log(`value for entries is: ${entries}`)
			var results = entries.map((item) => {
				return { // we can do some in-line styling for this too...
					title: `<p> <p>Position ${item.position}:</p><p>url: ${item.url}</p><p>${item.meta}</p></p>`, // placed inside a '<li> tag'
					text: item.url // this is entered into the data-params value in the html
				};
			});

			res.json(results);
			return;
		})
		.catch((err) => {
			console.log(`error in retrieving entries: ${err}`);
		});

		// var results = _.chain(response.body.data) // chains methods until .value is called
  //   .reject(function(result) {  // returns all items within a collection that fail a predicate
  //     return !result || !result. || !image.images.fixed_height_small; // all items that fail this are returned
  //   })
  //   .map(function(image) {
  //     return {
  //       title: '<img style="height:75px" src="' + image.images.fixed_height_small.url + '">',
  //       text: 'http://giphy.com/' + image.id
  //     };
  //   })
  //   .value(); // ends the _.chain


		// need to make a post-req
		// try {
		// 	response = sync.await(request({
		// 		url: 'http://127.0.0.1:1337/api/scrape/google/mixmax',
		// 		method: 'POST',
		// 		// http://127.0.0.1:1337/api/scrape/google/mixmax
		// 		json: true,
		// 		timeout: 10 * 1000
		// 	}, sync.defer()));
		// 	console.log(`value for response is: ${response}`);
		// } catch (e) {
		// 	console.log(`error received is: ${e}`);
		// 	res.status(500).send('Error');
		// 	return;
		// }


	}
}