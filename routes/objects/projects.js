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

	story.sdl         = req.body.sdl          ? req.body.sdl          : undefined;
	story.name        = req.body.name        ? req.body.name        : undefined;
	story.description = req.body.description ? req.body.description : undefined;
	story.weight       = req.body.weight      ? req.body.weight      : undefined;
	if(req.body.task){
		story.task      = req.body.task       ? req.body.task           : undefined;
	}
	
	return story;
};

var getTask = function(req){
	var task = {};

	task.sdl         = req.body.sdl          ? req.body.sdl          : undefined;
	task.name        = req.body.name        ? req.body.name        : undefined;
	task.description = req.body.description ? req.body.description : undefined;
	if(req.body.iteration){
		task.iteration   = req.body.iteration   ? req.body.iteration   : undefined;
	}

	return task;
};

var getProjectUpdate = function(req){
	var project = {};
	
	project.id        = req.body.id        ? req.body.id        : undefined;
	if(req.body.name){
		project.name        = req.body.name        ? req.body.name        : undefined;
	}
	if(req.body.vision){
		project.vision      = req.body.vision      ? req.body.vision      : undefined;
	}
	if(req.body.description){
		project.description = req.body.description ? req.body.description : undefined;
	}
	if(req.body.start){
		project.start       = req.body.start       ? req.body.start       : undefined;
	}
	if(req.body.stop){
		project.stop        = req.body.stop        ? req.body.stop        : undefined;
	}
	if(req.body.status){
		project.status      = req.body.status      ? req.body.status      : undefined;
	}
	
	return project;
};

var getIterationUpdate = function(req){
	var iteration = {};
	
	iteration.id        = req.body.id        ? req.body.id        : undefined;
	if(req.body.name){
		iteration.name   = req.body.name    ? req.body.name   : undefined;
	}
	if(req.body.start){
		iteration.start  = req.body.start   ? req.body.start  : undefined;
	}
	if(req.body.stop){
		iteration.stop   = req.body.stop   ? req.body.stop   : undefined;
	}
	if(req.body.status){
		iteration.status = req.body.status ? req.body.status : undefined;
	}
	if(req.body.product){
		iteration.product = req.body.product ? req.body.product : undefined;
	}	
	if(req.body.sdl){
		iteration.sdl    = req.body.sdl    ? req.body.sdl    : undefined;
	}
	
	return iteration;
};

var getTaskUpdate = function(req){
	var task = {};
	// ID has to be present for updates
	task.id          = req.body.id          ? req.body.id          : undefined;
	
	if(req.body.name){
		task.name        = req.body.name        ? req.body.name        : undefined;
	}
	if(req.body.status){
		task.status = req.body.status ? req.body.status : undefined;
	}
	if(req.body.description){
		task.description = req.body.description ? req.body.description : undefined;
	}
	if(req.body.sdl){
		task.sdl         = req.body.sdl         ? req.body.sdl         : undefined;
	}
	if(req.body.iteration){
		task.iteration   = req.body.iteration   ? req.body.iteration   : undefined;
	}
	
	return task;
};

var getStoryUpdate = function(req){
	var story = {};
	// ID has to be present for updates
	story.id          = req.body.id          ? req.body.id          : undefined;
	
	if(req.body.task){
		story.task      = req.body.task       ? req.body.task           : undefined;
	}
	if(req.body.name){
		story.name        = req.body.name        ? req.body.name        : undefined;
	}
	if(req.body.description){
		story.description = req.body.description ? req.body.description : undefined;
	}
	if(req.body.status){
		story.status = req.body.status ? req.body.status : undefined;
	}
	if(req.body.weight){
		story.weight       = req.body.weight      ? req.body.weight      : undefined;
	}
	if(req.body.sdl){
		story.sdl          = req.body.sdl         ? req.body.sdl         : undefined;
	}
	
	
	return story;
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

module.exports.projectUpdate = function(req){
	var project = getProjectUpdate(req);
	
	return project;
};

module.exports.taskUpdate = function(req){
	var task = getTaskUpdate(req);
	
	return task;
};

module.exports.iterationUpdate = function(req){
	var task = getIterationUpdate(req);
	
	return task;
};

module.exports.storyUpdate = function(req){
	var story = getStoryUpdate(req);
	
	return story;
};

