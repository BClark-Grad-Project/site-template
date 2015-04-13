var getAppForm = function(req){
	var app = {};
	
	app.user = req.session.user.id;
	app.name = req.body.name;
	app.description = req.body.description;
	
	return app;
};

var getUser = function(req){
	var app = {};
	
	app.user = req.session.user.id;
	
	return app;
};

module.exports.newApp = function(req){
	var app = getAppForm(req);
	
	return app;
};

module.exports.updateApp = function(req){
	var app = getAppForm(req);
	console.log(req.body.id);
	app.id  = req.body.id;
	
	return app;
};