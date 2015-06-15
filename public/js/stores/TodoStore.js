var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function addTodo(todo) {
  _todos[todo._id] = {
    id: todo._id,
    complete: todo.complete,
    text: todo.text
  };
}

function addTodos(rawTodos) {
	rawTodos.forEach(function(todo) {
		if (!_todos[todo.id]) {
			addTodo(todo);
		}
	});
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE_SUCCESS:
			addTodo(action.todo);
			TodoStore.emitChange();
      break;

		case TodoConstants.TODO_CREATE_FAILURE:
			console.log(action.err);
			break;

		case TodoConstants.TODO_UPDATE_TEXT_SUCCESS:
			var todo = action.todo;
			update(todo._id, { text: todo.text });				
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_UPDATE_TEXT_FAILURE:
			console.log(action.err);
			break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_ALL_SUCCESS:
      updateAll({ complete: action.markComplete });
      TodoStore.emitChange();
      break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_ALL_FAILURE:
			console.error(action.err);
			break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_SUCCESS:
			var todo = action.todo;
      update(todo._id, { complete: todo.complete });
      TodoStore.emitChange();
      break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_FAILURE:
			console.error(action.err);
			break;

		case TodoConstants.TODO_DESTROY_SUCCESS:
			destroy(action.id);
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_DESTROY_FAILURE:
			console.error(action.err);
			break;

		case TodoConstants.TODO_DESTROY_COMPLETED_SUCCESS:
      destroyCompleted();
      TodoStore.emitChange();
      break;

		case TodoConstants.TODO_DESTROY_COMPLETED_FAILURE:
			console.error(action.err);
			break;

		case TodoConstants.TODO_GET_ALL_SUCCESS:
			addTodos(action.rawTodos);
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_GET_ALL_FAILURE:
			console.error(action.err);
			break;
  }
});

module.exports = TodoStore;

