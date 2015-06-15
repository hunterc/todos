var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Todo = require('./lib/Todo');
var TodoController = require('./lib/TodoController');

// connect to mongo db
mongoose.connect('mongodb://localhost/todos');

var app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
var router = express.Router();
router.route('/todos')
	.get(TodoController.index)
	.post(TodoController.create)
	.patch(TodoController.toggleCompleteAll);

router.route('/todos/complete')
	.delete(TodoController.destroyCompleted);

router.route('/todos/:id')
	.get(TodoController.show)
	.patch(TodoController.update)
	.delete(TodoController.destroy);

app.use(router);

module.exports = app;
