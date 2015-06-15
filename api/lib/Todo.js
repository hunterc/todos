var mongoose = require('mongoose');

// Todo Model
var TodoSchema = new mongoose.Schema({
	text: { type: String, required: '"text" is required' },
	complete: { type: Boolean, default: false } 
});

module.exports = mongoose.model('Todo', TodoSchema);
