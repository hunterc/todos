var React = require('react');
var Header = require('./Header.react');
var Footer = require('./Footer.react');
var MainSection = require('./MainSection.react');
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
	return {
		allTodos: TodoStore.getAll(),
		areAllComplete: TodoStore.areAllComplete()
	};
}

var TodoApp = React.createClass({
	getInitialState: function() {
		return getTodoState();
	},

	// hook TodoApp up to the store
	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},

	// clean up after ourself
	componentWillUnmount: function() {
		TodoStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div>
				<Header />
				<MainSection
					allTodos={this.state.allTodos}
					areAllComplete={this.state.areAllComplete}	
				/>
				<Footer allTodos={this.state.allTodos} />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getTodoState());
	}
});

module.exports = TodoApp;
