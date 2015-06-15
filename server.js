var express = require('express');
var path = require('path');

var api = require('./api');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(api);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function() {
	console.log('Todos running on port 3000...');
});
