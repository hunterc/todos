var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoServerActions = {
	getAllSuccess: function(todos) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_GET_ALL_SUCCESS,
			rawTodos: todos
		});
	},

	getAllFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_GET_ALL_FAILURE,
			err: err
		});
	},

	createSuccess: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE_SUCCESS,
			todo: todo
		});
	},

	createFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE_FAILURE,
			err: err
		});
	},

	toggleCompleteSuccess: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_SUCCESS,
			todo: todo
		});
	},

	toggleCompleteFailure: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_FAILURE,
			err: err
		});
	},

	toggleCompleteAllSuccess: function(data) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL_SUCCESS,
			markComplete: data.complete
		});
	},

	toggleCompleteAllFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL_FAILURE,
			err: err
		});
	},

	updateTextSuccess: function(todo) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT_SUCCESS,
			todo: todo
		});
	},

	updateTextFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT_FAILURE,
			err: err
		});
	},

	destroySuccess: function(id) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_SUCCESS,
			id: id
		});
	},

	destroyFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_FAILURE,
			err: err
		});
	},

	destroyCompletedSuccess: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED_SUCCESS
		});
	},

	destroyCompletedFailure: function(err) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED_FAILURE,
			err: err
		});
	}
};

module.exports = TodoServerActions;
