'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//var Mixed = Schema.Types.Mixed;

/**
* Event Schema
*/

var EventSchema = new Schema({
	//ex. ORPO
	_id: String,

	first_year: Date,
	name: String,
	location: String,
	dates: [Date],

	teams: [{
		type: ObjectId,
		ref:'Team'
	}],
	matches: [{
		type: ObjectId,
		ref:'Match'
	}]
});

mongoose.model('Event', EventSchema);