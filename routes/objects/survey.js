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
	if(req.body.option) form.option = req.body.option;
	if(req.body.label) form.label = req.body.label;
	if(req.body.response) form.response = req.body.response;
	if(req.body.placeholder) form.placeholder = req.body.placeholder;
	if(req.body.label_placeholder) form.label_placeholder = req.body.label_placeholder;
	
	return form;
};

var updateQuestionForm = function(req){
	var form = {};	

	//
	if(req.body.type) form.type = req.body.type;
	if(req.body.question) form.question = req.body.question;
	
	//
	if(req.body.option) form.option = req.body.option;
	if(req.body.label) form.label = req.body.label;
	if(req.body.response) form.response = req.body.response;
	if(req.body.placeholder) form.placeholder = req.body.placeholder;
	if(req.body.label_placeholder) form.label_placeholder = req.body.label_placeholder;
	
	return form;
};

var responseItem = function(pos, req, pos2){
	var response = {};
	var current = req.body[req.body.question[pos] + '_checked'];
	response.survey   = req.body.survey;
	response.question = req.body.question[pos];
	response.date     = new Date;
	
	if(req.body.request) response.request = req.body.request;
	if(req.session.user.id)	response.user = req.session.user.id;
	//response.respondant = req.session.user.conID ? req.session.user.conID : ??;
	
	if(pos2 != undefined) {
		response.option = current[pos2];
		if(req.body[current[pos2] + '_response']){
			response.response = req.body[current[pos2] + '_response'];
		}
	} else {
		response.option = current;
		if(req.body[current + '_response']){
			response.response = req.body[current + '_response'];
		}
	}
	return response;
};

var responseQuestionnaireForm = function(req){
	var form = [];
	if(typeof req.body.question != 'string'){
		for(var i in req.body.question){
			var current = req.body[req.body.question[i] + '_checked'];
			if(current){
				if(Array.isArray(current)){
					for(var n = 0; n < current.length; n++) form.push(responseItem(i, req, n));
				} else form.push(responseItem(i, req));			
			}
		}
	} else {
		var current = req.body[req.body.question + '_checked'];
		if(current){
			if(Array.isArray(current)){
				for(var n = 0; n < current.length; n++) {
					var response = {};
					response.survey   = req.body.survey;
					response.question = req.body.question;
					response.date     = new Date;
					
					if(req.body.request) response.request = req.body.request;
					if(req.session.user.id)	response.user = req.session.user.id;
					response.option = current[n];
					if(req.body[current[n] + '_response']){
						response.response = req.body[current[n] + '_response'];
					}
					form.push(response);
				}
			} else {
				var response = {};
				response.survey   = req.body.survey;
				response.question = req.body.question;
				response.date     = new Date;
				
				if(req.body.request) response.request = req.body.request;
				if(req.session.user.id)	response.user = req.session.user.id;
				response.option = current;
				response.response = req.body[current + '_response'];
				form.push(response);
			}		
		}
	}
	console.log(form);
	return form;
};

var requestForm = function(req){
	var form = [];
	var id = req.body.id;
	if(req.body.name){
		form.push({email:req.body.email,name:req.body.name,survey:id});
	} else {
		if(req.body.email[0]){
			for(var i in req.body.email){
				var email = req.body.email[i];
				var name = req.body[email];
				form.push({email:email,name:name,survey:id});
			}
		}
	}
	
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

module.exports.getSurveyResponse = function(req, survey){
	var form = responseQuestionnaireForm(req);
	
	
	return form;
};

module.exports.getNewRequest = function(req, survey){
	var form = requestForm(req);
	
	
	return form;
};