var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//var Mixed = Schema.Types.Mixed;

/**
* Team Schema
*/

var TeamSchema = new Schema({
	// ex. 1540
	_id: Number,

	//basic info
	name: String,
	//relevant awards
	awards: [String],

	robot: {
		type: ObjectId,
		ref: 'Robot'
	},

	events: [{
		type: ObjectId,
		ref: 'Event'
	}],

	matches: [{
		type: ObjectId,
		ref: 'Match'
	}]
});

mongoose.model('Team', TeamSchema);