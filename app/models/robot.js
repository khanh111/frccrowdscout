var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

/**
* Robot Schema
*/

var RobotSchema = new Schema({
	//ex. ORPO
	_id: Number,
	team: {
		type: Schema.ObjectId, 
		ref: 'Team'
	},
	name: String,

	stats: Mixed
});
