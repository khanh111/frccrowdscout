var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

/**
* Scout Schema
*/

//add authentication?
var ScoutSchema = new Schema({
	team: {
		type: ObjectId,
		ref: 'Team'
	},
	name: String,

	matches: [{
		type: ObjectId,
		ref: 'Match'
	}]
});
