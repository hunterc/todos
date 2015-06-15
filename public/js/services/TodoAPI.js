var request = require('superagent');
var TodoServerActions = require('../actions/TodoServerActions');

var API_BASE = 'http://localhost:3000';

module.exports = {
	getAllTodos: function() {
		request
			.get('/todos')
			.end(function(err, res) {
				if (err) TodoServerActions.getAllFailure(err);
				var todos = res.body;
				TodoServerActions.getAllSuccess(todos);
			});
	},

	create: function(text) {
		request
			.post(API_BASE + '/todos').
			send({ text: text })
			.end(function(err, res) {
				if (err) TodoServerActions.createFailure(err);
				var todo = res.body.todo;
				TodoServerActions.createSuccess(todo);
			});
	},

	updateText: function(id, data) {
		request
			.patch(API_BASE + '/todos/' + id)
			.send(data)
			.end(function(err, res) {
				if (err) TodoServerActions.updateTextFailure(res);
				var todo = res.body.todo;
				TodoServerActions.updateTextSuccess(todo);
			});
	},

	toggleComplete: function(id, data) {
		request.patch(API_BASE + '/todos/' + id)
			.send(data)
			.end(function(err, res) {
				if (err) TodoConstants.toggleCompleteFailure(err);
				var todo = res.body.todo;
				TodoServerActions.toggleCompleteSuccess(todo);
			});
	},

	toggleCompleteAll: function(data) {
		request
			.patch(API_BASE + '/todos')
			.send(data)
			.end(function(err, res) {
				if (err) TodoConstants.toggleCompleteAllFailure(err);
				TodoServerActions.toggleCompleteAllSuccess(data);
			});
	},

	destroy: function(id) {
		request
			.del(API_BASE + '/todos/' + id)
			.end(function(err, res) {
				if (err) TodoServerActions.destroyFailure(err);
				TodoServerActions.destroySuccess(id);
			});
	},

	destroyCompleted: function() {
		request
			.del(API_BASE + '/todos/complete')
			.end(function(err, res) {
				if (err) TodoServerActions.destroyCompletedFailure(err);
				TodoServerActions.destroyCompletedSuccess();
			});
	}
};
