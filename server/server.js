var express = require('express');
var app = express();

var port = process.env.PORT || 9000;

// middleware
require('./middleware')(app, express);

// routes
require('./routes')(app, express);

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});