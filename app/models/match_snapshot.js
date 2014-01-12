'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

/**
* Match Snapshot Schema - If multiple scouts push data for the same match, we have multiple snapshots of that match
*/

var MatchSnapshotSchema = new Schema({

	scout: {
		type: ObjectId,
		red: 'Scout'
	},

	submitTime: Date,

	redAllianceStats: Mixed,

	blueAllianceStats: Mixed,
});

mongoose.model('MatchSnapshot', MatchSnapshotSchema);