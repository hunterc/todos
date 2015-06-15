var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoAPI = require('../services/TodoAPI');

var TodoActions = {
	create: function(text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
		TodoAPI.create(text);
	},

	updateText: function(id, text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
		TodoAPI.updateText(id, {text: text});
	},

	toggleComplete: function(todo) {
		var toggle = !todo.complete;
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE,
			complete: toggle,
			id: todo.id
		});
		TodoAPI.toggleComplete(todo.id, { complete: toggle });
	},

	toggleCompleteAll: function(markComplete) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
		});
		TodoAPI.toggleCompleteAll({ complete: markComplete });
	},

	destroy: function(id) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
		TodoAPI.destroy(id);
	},

	destroyCompleted: function() {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED
		});
		TodoAPI.destroyCompleted();
	}
};

module.exports = TodoActions;
