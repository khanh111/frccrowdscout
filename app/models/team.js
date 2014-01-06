var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

/**
* Team Schema
*/

var TeamSchema = new Schema({
	// ex. 1540
	_id: Number,

	//basic info
	name: String,
	//relevant awards
	awards: [String]

	robotData: {
		type: Schema.ObjectId, 
		ref: 'Robot'
	},

	events: [{
		type: Schema.ObjectId, 
		ref: 'Event'
	}],

	matches: [{
		type: Schema.ObjectId,
		ref: 'Match'
	}]
});
