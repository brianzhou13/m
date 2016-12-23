var Bluebird = require('bluebird');
var axios = require('axios');
// var request = require('request');
// var sync = require('synchronize');


module.exports = {
	/*
	 * @name: typeahead
	 * @input: the req and res values
	 * @output: an json obj with a `title` and `text` property that contains html of what's to be inserted when user types
	 * @notes: n/a
	 */
	typeahead: (req, res) => {
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
					resolve(entries.data);
				})
				.catch((err) => {
					console.log(`error retrieving results-- err: ${err}`);
					reject(err);
				});
		})
		.then((entries) => {
			var results = entries.map((item) => {
				return {
					title: `<p> <p>Position ${item.position}:</p><p>url: ${item.url}</p><p>${item.meta}</p></p>`, // placed inside a '<li> tag'
					// title: `<span>position: ${item.position} | url: <a href=${result.url}>${result.url}</a> | meta: ${result.meta}</span>`,
					text: item.position.toString() + ':' + item.query// this is entered into the data-params value in the html, and the datat sent to resolver
				};
			});

			res.json(results);
			return;
		})
		.catch((err) => {
			console.log(`error in retrieving entries: ${err}`);
		});
	},

	/*
	 * @name: resovler
	 * @input: the req and res values
	 * @output: an json obj with a `body` property that contains html of what's to be inserted
	 * @notes: - code isn't 100% DRY as parts were directly copied from above -- a future clean-up.
	 * 	       - also we'd need to look into how to add styling 
	 */
	resolver: (req, res) => {
		var queries = req.query.text.trim().split(':');
		var term_position = queries[0];
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
				return item.position === parseInt(term_position);
			});

			var result = result[0];
			res.json({
				body: `<div>
								<style>
									.result-text { 
									font-family: Helvetica;
									font-size: 14px;
									font-weight: 100; }

									.bar {
										font-size: 15px;
										font-weight: 10;
										color: #ff7e82;
										opacity: 0.8;
									}

									.type {
										font-weight: 400;
									}
								</style>
								<span class='result-text'><span class='type'>position</span>: ${result.position} <span class='bar'>|</span> <span class='type'>url</span>: 
								<a href=${result.url}>${result.url}</a> <span class='bar'>|</span> <span class='type'>meta</span>: ${result.meta}</span>
							</div>`
			});
		})
		.catch((err) => {
			console.log(`error in our resolver: ${err}`);
		});
	}
};