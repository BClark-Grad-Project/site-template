var newQuestionnaireForm = function(req){
	var form = {};

	// Required
	form.user        = req.session.user.id;
	form.name        = req.body.name;
	form.description = req.body.description;
	form.catagory    = req.body.catagory;
	
	// Optional
	if(req.body.conductor) form.conductor = req.body.conductor;
	if(req.body.website) form.website     = req.body.website;
	if(req.body.email) form.email         = req.body.email;
	if(req.body.response) form.response   = req.body.response;
	if(req.body.end) form.end             = req.body.end;
	// need one fore header?
	
	return form; 
};

var newQuestionForm = function(req){
	var form = {};	

	//
	if(req.body.type) form.type = req.body.type;
	if(req.body.question) form.question = req.body.question;
	
	//
	if(req.body.label) form.label = req.body.label;
	if(req.body.response) form.response = req.body.response;
	if(req.body.placeholder) form.placeholder = req.body.placeholder;
	
	return form;
};

var updateQuestionForm = function(req){
	var form = {};	

	//
	if(req.body.question) form.question = req.body.question;
	
	//
	if(req.body.option) form.option = req.body.option;
	if(req.body.label) form.label = req.body.label;
	if(req.body.response) form.response = req.body.response;
	if(req.body.placeholder) form.placeholder = req.body.placeholder;
	
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

module.exports.getUpdatedQuestion = function(req){
	var formContent = updateQuestionForm(req); 
	
	return formContent;
};