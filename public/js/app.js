var React = require('react');

var TodoApp = require('./components/TodoApp.react');
var TodoAPI = require('./services/TodoAPI');

// get initial data
TodoAPI.getAllTodos();

// mount the TodoApp component
React.render(
	<TodoApp />,
	document.getElementById('todoapp')
);
