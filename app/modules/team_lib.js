'use strict';

var Team = mongoose.model('Team');
var Promise = mongoose.Promise;
var teamMethods = {};

// POTENTIALLY CHANGE TO USE TheBlueAlliance API
// TEAM WRAPPER
teamMethods.createTeam = function dbCreateTeam(id, teamInfo, callback) {

  var promise = new Promise();

  /* PROMISE WORKFLOW
    1. validate args
      yes: retrieveBlueAllianceInfo
      no: returnErrorToUser - END

    2. retrieveBlueAllianceInfo
      yes: create the team
      no: return the error that this team doesn't exist - End
    
    3. saveTeamToDb
      regardless: return err and newTeam
  */

  //validate args
  var teamCreationValidation = promise.then(function teamCreationValidation() {
    // check id type and whether id exists
    if(_.isNumber(id)) {
      //console.error('wrong arguments => id: '+ id +', name: '+ name +', callback: '+ callback +'.');
      promise.error(new Error('invalid team number'));
    }
    //check id exists
    if(!id) {
      //console.error('tried to create team without an id');
      promise.error(new Error('ERR: tried to create team without ID'));
    }
    // teamInfo is required
    // needs keys for name, location, awards, 2014 events, etc.
    if(!_.isObject(teamInfo)) {
      //if it isn't an object, it's bad
      promise.error(new Error('ERR: Invalid teamInfo object'));
    }

    //teamInfo setup
    teamInfo.name = teamInfo.name || 'Team ' + id;
    teamInfo.location = teamInfo.location || 'Unknown';
    teamInfo.awards = teamInfo.awards || [];
    teamInfo.events = teamInfo.event || [];

    //check for a function callback
    if(!_.isFunction(callback)) {
      //console.error('tried to create team without an id');
      promise.error(new Error('callback must be a function'));
    }

    promise.complete({
      id: id,
      teamInfo: teamInfo,
      callback: callback
    });
  });

  // if the validation completes, do this
  // create the team with the 
  var saveTeamToDb = teamCreationValidation.addCallback(function saveTeamToDb(params) {
    var id = params.id;
    var teamInfo = params.teamInfo;
    var callback = params.callback;

    var team = new Team();
    //defaults
    team._id = id;

    // use TBA API to get info instead of this?
    // ERROR: Currently does not get matches of this season!
    team.name = teamInfo.name || 'Team '+ id;
    team.matches = [];
    team.awards = [];
    team.robot = null;
    team.events = teamInfo.events;

    team.save(function(err, newTeam) {
      // reject if there is an error
      if(err) {
        retrieveBlueAllianceInfo.error(err, newTeam);
      }
      else {
        retrieveBlueAllianceInfo.complete(null, newTeam)
      }
    });
  })

  .addCallback(function(err, newTeam) {
    // returns err, which is always null if this is a success
    // or an error if there is an error

    // newTeam is newTeam || null;
    callback(err, newTeam);
  })

  // Promise chain is complete!!!
  .end();

  // start the chain of events!!!
  promise.fulfill();
};

teamMethods.getTeam = function dbGetTeam(id, options, callback) {
  var promise = new Promise();

  /* PROMISE WORKFLOW
    1. validate args
      yes: get team from db
      no: returnErrorToUser
        END

    2. get teams from db
      yes: return them
      no: return the error
      BACK: END
  */

  //validate args
  var singleTeamRetrievalValidation = promise.then(function singleTeamRetrievalValidation() {
    //check id type and whether id exists
    if(_.isNumber(id)) {
      //console.error('wrong arguments => id: '+ id +', name: '+ name +', callback: '+ callback +'.');
      promise.error(new Error('invalid team number'));
    }
    // options is optional argument, if it is a function, then this is someone using it optionally
    if(!_.isObject(options)) {
      if(_.isFunction(options)) {
        // set callback to options
        callback = options;
        options = null;
      }
      else {
        //if it isnt a function, and it isn't an object, it's bad
        promise.error(new Error('ERR: Invalid options object'));
      }
    }
    // check for a function callback
    if(!_.isFunction(callback)) {
      // reject promise with this error.
      promise.error(new Error('callback must be a function'));
    }

    promise.complete({
      id: id,
      options: options,
      callback: callback
    });
  });

  // get the team on successful validation
  // currently get single teams based on id, allow other ways in future?
  var getTeamFromDb = singleTeamRetrievalValidation.addCallback(function saveTeamToDb(params) {
    var id = params.id;
    var options = params.options || null;
    var callback = params.callback;

    //gets Team and calls user callback with err, team (or null) parameters
    Team.findById(id).exec(callback);
    });
  })

  // Promise chain is complete!!!
  .end();

  // start the chain of events!!!
  promise.fulfill();
};

// this module can be exported into one variable that has team function
exports = teamMethods;








// UNFINISHED!!!

//for multiple teams
var dbGetTeams = function dbGetTeams(teamIds, callback) {
    
  console.log('db#getTeams',teamIds);
  var query = Team;

  //default is arrays (multiple teams)
  if(_.isArray(teamIds)) {
    var queryRegExp = new RegExp(teamIds.join('|'));
    query = query.find({_id:queryRegExp}); //queries for all teams in db 
  }
  //all teams
  else if(_.isFunction(teamIds)){
    callback = teamIds;
    query = query.find({});
  }
  //covers error cases
  else {
    query = query.find({});
    callback = function(err, team) {
      if(!err) 
        console.log(team);
      else 
        throw new Error('can not get team '+ id +' from database with current arguments');
    };
  }

  query.exec((callback || function(e,t){console.log(e,t);}));
};

//not rewritten
//what if it isnt there?
var dbRemoveTeam = function dbRemoveTeam(id, callback) {
  if(typeof id !== 'string') {
    console.log('DB REMOVE: id does not work');
  }

  Team.findOneAndRemove({_id: id}, function(err) {
    if(!err) {
      console.log('Team '+ id +' removed!')
    }
    else {
      console.log('Team '+ id +' not removed!')
    }

    //if there is a callback
    if(_.isFunction(callback)) {
      callback(err);
    }
    else {
      console.log('remove callback is not a function');
    }
  });
};

//not rewritten
//IMPROVE CALLBACKS
//dbUpdateTeam('1540', {name: 'Flaming Chickens'}, func())
var dbUpdateTeam = function dbUpdateTeam(id, updateObj, callback) {
  callback = _.isFunction(callback) || function(e,t) {console.log(e,t)};
  if(typeof id === 'string' && _.isObject(updateObj) && _.isFunction(callback)) {
    Team.findOneAndUpdate({_id:id}, updateObj, callback);
  }
  else {
    callback(new Error('not enough info to update team'), null);
  }
}
