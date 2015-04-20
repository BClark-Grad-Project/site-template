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
	});
	router.get('/open', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/closed', function(req, res, next) {
		res.render('survey/index', {title:req.app.locals.service_name, user: req.session.user });
	});
	
	/* CCA pages. */
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
		data.survey.read({id:id}, function(err, survey){
			if(err){
				console.log('getting question error: ', err);
				res.redirect('/survey/create/question/' + id);
			} else res.render('survey/questions', {title:req.app.locals.service_name, user: req.session.user, survey: survey[0] });			
		});
	}).post('/create/question/:id', function(req, res, next) {    // POST Create Question
		var id = req.params.id;
		var form = surveyObjs.getUpdateQuestion(req);
		form.survey = id;
		data.survey.update({question:form}, function(err, question){
			if(err) {
				console.log('error creating new question.', err);
				return cb(err, form);
			} else res.redirect('/create/question/' + id);
		});
	});
	
	router.get('/create/question/:id/:question', function(req, res, next) {
		// make sure question being edited is pulled up.
		var question = req.params.question;
		var id = req.params.id;
		data.survey.read({id:id}, function(err, survey){
			if(err){
				console.log('Adding question error: ', err);
				res.redirect('/survey/create/question/' + id);
			} else res.render('survey/questions', {title:req.app.locals.service_name, user: req.session.user, survey: survey[0], question: question });			
		});
	}).post('/create/question/:id/:question', function(req, res, next) {
		// update question.
		var id = req.params.id;
		var form = surveyObjs.getUpdateQuestion(req);
		form.survey = id;
		data.survey.update({question:form}, function(err, question){
			if(err) {
				console.log('error creating new question.', err);
				return cb(err, form);
			} else res.redirect('/create/question/' + id + '/' + question.id);
		});
	});
	router.post('/create/question/add/:id', function(req, res, next) {
		var id = req.params.id;
		var form = surveyObjs.getNewQuestion(req);
		form.survey = id;
		data.survey.create({question:form}, function(err, question){
			if(err) {
				console.log('error creating new question.', err);
				return cb(err, form);
			} else res.redirect('/create/question/' + id + '/' + question.id);
		});
	});
	
	router.get('/conduct', function(req, res, next) { // GET Conduct
		res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user });
	}).post('/conduct', function(req, res, next) {    // POST Conduct
		res.render('survey/conduct', {title:req.app.locals.service_name, user: req.session.user });
	});
	router.get('/analyze', function(req, res, next) { //Analyze
		res.render('survey/analyze', {title:req.app.locals.service_name, user: req.session.user });
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
	
	return router;
};   