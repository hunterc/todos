var Todo = require('./Todo');

var TodoController = {
	index: function(req, res, next) {
		Todo.find(function(err, todos) {
			if (err) res.send(err);
			res.json(todos);
		});	
	},

	show: function(req, res, next) {
		Todo.findById(req.params.id, function(err, todo) {
			if (err) res.send(err);
			res.json(todo);
		});
	},

	create: function(req, res, next) {
		var todo = new Todo();
		todo.text = req.body.text;

		todo.save(function(err, todo) {
			if (err) return res.send(err);
			res.json({ message: 'todo created', todo: todo });
		});
	},

	destroy: function(req, res, next) {
		Todo.remove({ _id: req.params.id }, function(err, todo) {
			if (err) res.send(err);
			res.json({ message: 'deleted todo', todo: todo });
		});		
	},

	destroyCompleted: function(req, res, next) {
		Todo.remove({ complete: true }, function(err, resp) {
			if (err) res.send(err);
			var removed = resp.n;
			res.json({ message: 'successfully deleted ' + removed + ' todos' });
		});
	},

	update: function(req, res, next) {
		Todo.findById(req.params.id, function(err, todo) {
			if (err) res.send(err);

			// only update what we are given - model prevents unknown fields from being saved 
			for (var key in req.body) {
				todo[key] = req.body[key];
			}
			console.log('update: ', todo);
			todo.save(function(err, todo) {
				if (err) res.send(err);
				res.json({ message: 'todo updated', todo: todo });
			});
		});
	},

	toggleCompleteAll: function(req, res, next) {
		var markComplete = req.body.complete;
		Todo.update({}, { complete: markComplete }, { multi: true }, function(err) {
			if (err) res.send(err);
			res.json({ message: 'marked all documents "complete": ' + markComplete });
		});
	}
};

module.exports = TodoController;
