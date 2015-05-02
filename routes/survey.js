module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	var surveyObjs = require('./objects/survey.js');
	var imageObj = require('./objects/images.js');
	
	/* GET home page. */
	/* Note: For now the following three routes can lead to the same page so long as it filters 
	 * these sections.  If time permits try and make the page dynamic in its presentation*/
	router.get('/', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	}).post('/', function(req, res, next) { // Complete survey
		var form = surveyObjs.getSurveyResponse(req);
		
		data.survey.C.respond(form);
		data.survey.R.surveyForm({id: req.body.survey}, function(err, survey){
			if(err) {
				console.log('');
				next();
			} else res.render('survey/thankyou', {title:req.app.locals.service_name, user: req.session.user, survey:survey });
		});
	});	
	router.get('/open', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/closed', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/result/:id', function(req, res, next) { // Delete survey.
		var id = req.params.id;
		data.survey.R.surveyResult({id:id}, function(err, survey){
			if(err){
				console.log(err);
				res.redirect('/survey/analyze');
			} else res.render('survey/result', {title:req.app.locals.service_name, user: req.session.user, survey:survey });
		});
	});


	
	/* CCA pages. */
	/*
	 * CREATING OPERATIONS
	 * */
	router.get('/create', function(req, res, next) { // GET Create
		data.survey.read({user:req.session.user.id, state:0}, function(err, surveys){
			console.log(err, surveys);
			if(err){
				console.log('Search for unbegun questionnaires error: ', err);
				res.redirect('/survey/create');
			} else res.render('survey/create', {title:req.app.locals.service_name, user: req.session.user, surveys: surveys });
		});
	}).post('/create', function(req, res, next) {    // POST Create
		var form = surveyObjs.getNewSurvey(req);
		if(req.files.header){
			imageObj.saveAWS(req);
			form.header = 'https://s3.amazonaws.com/789234rbsdcbs8fwiwfwiuygc/' + imageObj.generateFileName(form.user, form.name, req.files.header);
		}
		data.survey.create(form, function(err, survey){
			if(err){
				console.log('Creating questionnaire detail error: ', err);
				res.render('survey/create', {title:req.app.locals.service_name, user: req.session.user, survey: form });
			} else res.redirect('/survey/create/question/' + survey.id);			
		});
	});
	router.get('/create/question/:id', function(req, res, next) { // GET Create Question
		var id = req.params.id;
		data.survey.read({id:id, state:0}, function(err, survey){
			console.log(survey);
			if(err){
				console.log('getting question error: ', err);
				res.redirect('/survey/create');
			} else res.render('survey/questions', {title:req.app.locals.service_name, user: req.session.user, survey: survey[0] });			
		});
	}).post('/create/question/:id', function(req, res, next) {    // POST Create Question
		var id = req.params.id;
		var form = surveyObjs.getUpdatedQuestion(req);
		form.survey = id;
		data.survey.update({question:form}, function(err, question){
			if(err) {
				console.log('error creating new question.', err);
				res.redirect('/survey/create/question/' + id);
			} else res.redirect('/survey/create/question/' + id);
		});
	});

	router.post('/create/question/add/:id', function(req, res, next) {
		console.log('running add question');
		var id = req.params.id;
		var form = surveyObjs.getNewQuestion(req);
		form.survey = id;
		console.log('sending form',form);
		data.survey.create({question:form}, function(err, question){
			if(err) {
				console.log('error creating new question.', err);
				res.redirect('/survey/create/question/' + id );
			} else res.redirect('/survey/create/question/' + id + '/' + question.id);
		});
	});

	router.get('/create/question/delete/:id/:question', function(req, res, next) {
		var id       = req.params.id;
		var question = req.params.question;
		data.survey.remove({question:question}, function(err, response){
			if(err) {
				console.log('error deleting question.', err);
				res.redirect('/survey/create/question/' + id );
			} else res.redirect('/survey/create/question/' + id );
		});
	});

	router.get('/create/question/delete/:id/:question/:option', function(req, res, next) {
		console.log('running get question');
		// make sure question being edited is pulled up.
		var question = req.params.question;
		var id = req.params.id;
		var option = req.params.option;
		data.survey.remove({option:option}, function(err, survey){
			if(err){
				console.log('Deleting option error: ', err);
				res.redirect('/survey/create/question/' + id + '/' + question);
			} else res.redirect('/survey/create/question/' + id + '/' + question);
		});
	});
	
	router.get('/create/question/:id/:question', function(req, res, next) {
		console.log('running get question');
		// make sure question being edited is pulled up.
		var question = req.params.question;
		var id = req.params.id;
		data.survey.read({id:id}, function(err, survey){
			if(err){
				console.log('Adding question error: ', err);
				res.redirect('/survey/create/question/' + id);
			} else res.render('survey/questions', {title:req.app.locals.service_name, user: req.session.user, survey: survey[0], question: question });			
		});
	});
	
	router.post('/create/question/:id/:question', function(req, res, next) {
		// update question.
		var id = req.params.id;
		var question = req.params.question;
		
		var form = surveyObjs.getUpdatedQuestion(req);
		form.id = question;
		form.survey = id;
		console.log(form);
		data.survey.update({question:form}, function(err, questionObj){
			if(err) {
				console.log('error creating new question.', err);
				res.redirect('/survey/create/question/' + id + '/' + question);
			} else res.redirect('/survey/create/question/' + id + '/' + question);
		});
	});
	
	router.post('/update/:id', function(req, res, next) { // Delete survey.
		var form = surveyObjs.getNewSurvey(req);
		form.id = req.params.id;		
		if(req.files.header){
			imageObj.saveAWS(req);
			form.header = 'https://s3.amazonaws.com/789234rbsdcbs8fwiwfwiuygc/' + imageObj.generateFileName(form.user, form.name, req.files.header);
		}
		data.survey.update(form, function(err, response){
			if(err){
				console.log(err);
				res.redirect('/survey/create/');
			} else res.redirect('/survey/create/question/' + req.params.id);	
		});
	});
	router.get('/delete/:id', function(req, res, next) { // Delete survey.
		var id = req.params.id;
		
		data.survey.remove({id:id}, function(err, response){
			if(err){
				console.log(err);
				res.redirect('/survey/create/');
			} else res.redirect('/survey/create');	
		});
	});
	
	
	
	

	/*
	 * CONDUCTING OPERATIONS
	 * */
	router.get('/conduct', function(req, res, next) { // GET Conduct
		data.survey.read({user:req.session.user.id, state:1}, function(err, surveys){
			if(err) res.redirect('/survey/conduct');
			else res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user, surveys:surveys });			
		});
	});
	
	router.get('/conduct/request/:id', function(req, res, next) { // GET Conduct
		var id = req.params.id;		
		data.survey.read({id:id, state:1}, function(err, survey){	
			if(err) res.redirect('/survey/conduct');
			else res.render('survey/request', {title:req.app.locals.service_name, user: req.session.user, survey: survey[0] });
		});
	}).post('/conduct/request/:id', function(req, res, next) {    // POST Conduct
		res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user });
	});

	router.get('/conduct/begin/:id', function(req, res, next) { // GET Conduct
		var id = req.params.id;
		data.survey.update({ id:id, state:1 }, function(err, response){
			if(err) res.redirect('/survey/conduct');
			else res.redirect('/survey/conduct'); // /response/' + id);
		});
	});
	router.get('/conduct/stop/:id', function(req, res, next) { // GET Conduct
		var id = req.params.id;
		data.survey.update({ id:id, state:0 }, function(err, response){
			if(err) res.redirect('/survey/conduct');
			else res.redirect('/survey/create/question/' + id);
		});
	});
	router.get('/conduct/finish/:id', function(req, res, next) { // GET Conduct
		var id = req.params.id;
		data.survey.update({ id:id, state:2 }, function(err, response){
			if(err) res.redirect('/survey/conduct');
			else res.redirect('/survey/results/' + id);
		});
	});
	
	
	
	/*
	 * ANALYZING OPERATIONS
	 * */	
	router.get('/analyze', function(req, res, next) { //Analyze
		data.survey.read({user:req.session.user.id}, function(err, surveys){
			if(err) res.redirect('/');
			else res.render('survey/analyze', {title:req.app.locals.service_name, user: req.session.user, surveys:surveys });			
		});
	});
	router.get('/analyze/response/:id', function(req, res, next) { // Get response documents
		var id = req.params.id;
		data.survey.R.responses({survey:id}, function(err, responses){
			if(err) {
				console.log('problem getting user responses');
				res.redirect('/survey/sorry');
			} else data.survey.R.surveyForm({id:id}, function(err, survey){
				if(err) {
					console.log('');
					res.redirect('/survey/sorry');
				} else res.render('survey/response', {title:req.app.locals.service_name, user: req.session.user, survey:survey, responses:responses });
			});
		});
	});
	
	
	
	
	
	/* GET questionnaire list */	
	router.get('/user', function(req, res, next) { // Open & Closed
		res.render('survey/manage', {title:req.app.locals.service_name, user: req.session.user });
	});	
	router.get('/open/user', function(req, res, next) { // Open
		res.render('survey/manageopen', {title:req.app.locals.service_name, user: req.session.user });
	});	
	router.get('/closed/user', function(req, res, next) { // Closed
		res.render('survey/manageclosed', {title:req.app.locals.service_name, user: req.session.user });
	});	  

	router.get('/sorry', function(req, res, next) { // Closed
		res.render('survey/sorry', {title:req.app.locals.service_name, user: req.session.user });
	});	 

	router.get('/:id', function(req, res, next) { // Get survey
		var id = req.params.id;
		data.survey.R.surveyForm({id:id}, function(err, survey){
			if(err) {
				console.log('');
				res.redirect('/survey/sorry');
			} else res.render('survey/survey', {title:req.app.locals.service_name, user: req.session.user, survey:survey });
		});
	});

	router.get('/:id/:request', function(req, res, next) { // get survey for requested user
		var id = req.params.id;
		var request = req.params.request;
		data.survey.R.surveyForm({id:id}, function(err, survey){
			if(err) {
				console.log('');
				res.redirect('/survey/sorry');
			} else res.render('survey/survey', {title:req.app.locals.service_name, user: req.session.user, survey:survey, request: request });
		});
	});	
	
	return router;
};   