var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

/**
* Match Schema
*/

var MatchSchema = new Schema({
	event: {
		type: ObjectId, 
		ref:'Event'
	},
	number: Number,

	time: Date,

	redAlliance: {
		teams: [{
			type: ObjectId, 
			ref: 'Team'
		}],
		score: Number,
		fouls: Number, //points or number?
		stats: Mixed
	},

	blueAlliance: {
		teams: [{
			type: ObjectId, 
			ref: 'Team'
		}],
		score: Number,
		fouls: Number, //points or number?
		stats: Mixed
	},
	
	matches: [{
		type: ObjectId, 
		ref:'Match'
	}]
});
