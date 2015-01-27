/**
 * New node file
 */
var getProject = function(req){
	var project = {};
	
	project.name        = req.body.name        ? req.body.name        : undefined;
	project.vision      = req.body.vision      ? req.body.vision      : undefined;
	project.description = req.body.description ? req.body.description : undefined;
	project.start       = req.body.start       ? req.body.start       : undefined;
	project.stop        = req.body.stop        ? req.body.stop        : undefined;
	project.status      = req.body.status      ? req.body.status      : undefined;
	
	return project;
};

var getStory = function(req){
	var story = {};

	story.sdl         = req.body.id          ? req.body.id          : undefined;
	story.name        = req.body.name        ? req.body.name        : undefined;
	story.description = req.body.description ? req.body.description : undefined;
	story.weight       = req.body.weight      ? req.body.weight      : undefined;
	
	return story;
};

var getTask = function(req){
	var task = {};

	task.sdl         = req.body.id          ? req.body.id          : undefined;
	task.name        = req.body.name        ? req.body.name        : undefined;
	task.description = req.body.description ? req.body.description : undefined;
	
	return task;
};

module.exports.newProject = function(req){
	var project = getProject(req);
	
	return project;
};

module.exports.newTask = function(req){
	var task = getTask(req);
	
	return task;
};

module.exports.newStory = function(req){
	var story = getStory(req);
	
	return story;
};

