var newQuestionnaireForm = function(req){
	var form = {};

	// Required
	form.user        = req.session.user.id;
	form.name        = req.body.name;
	form.description = req.body.description;
	form.catagory    = req.body.catagory;
	
	// Optional
	form.conductor   = req.body.conductor;
	form.website     = req.body.website;
	form.email       = req.body.email;
	form.response    = req.body.response;
	form.end         = req.body.end;
	form.header      = '';// req.body.header;
	
	return form; 
};

var newQuestionForm = function(req){
	var form = {};
	
	
	
	return form;
};

module.exports.getNewSurvey = function(req){
	var formContent = newQuestionnaireForm(req); 
	
	return formContent;
};

module.exports.getNewQuestion = function(req){
	var formContent = newQuestionForm(req); 
	
	return formContent;
};