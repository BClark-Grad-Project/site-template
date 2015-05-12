module.exports = function (data) {
	var express = require('express');
	var router = express.Router();
	
	var verifyKey = function(key, cb){		
		data.api.read({token:key}, function(err, userKey){
			if(err) return cb(false, null);
			else return cb(null, userKey[0]);
		});
	};
	
	/* GET home page. */
	router.get('/:key', function(req, res) {
		var key = req.params.key;
		verifyKey(key, function(err, userKey){
			if(err){
				console.log(err);
				res.json('[{error:"*Denied Access* Key not found!"}]');
			} else data.survey.read({user:userKey.user, active:true, state:{$ne: 0 }}, function(err, data){
				if(err){
					console.log(err);
					res.json('[{error:"Unknown problem extracting data.  Please report to https://github.com/BClark-Grad-Project/site-survey/issues."}]');
				} else res.json(data);
			});
		});
	});
	
	router.get('/:key/:questionnaire', function(req, res) {
		var key = req.params.key;
		var questionnaire = req.params.questionnaire;
		
		verifyKey(key, function(err, userKey){
			if(err){
				console.log(err);
				res.json('[{error:"*Denied Access* Key not found!"}]');
			} else data.survey.R.surveyForm({id:questionnaire}, function(err, data){
				if(err){
					console.log(err);
					res.json('[{error:"Unknown problem extracting data.  Please report to https://github.com/BClark-Grad-Project/site-survey/issues."}]');
				} else res.json(data);
			});
		});
	});

	router.get('/:key/responses/:questionnaire', function(req, res) {
		var key = req.params.key;
		var questionnaire = req.params.questionnaire;

		verifyKey(key, function(err, userKey){
			if(err){
				console.log(err);
				res.json('[{error:"*Denied Access* Key not found!"}]');
			} else data.survey.R.responses({survey:questionnaire}, function(err, data){
				if(err){
					console.log(err);
					res.json('[{error:"Unknown problem extracting data.  Please report to https://github.com/BClark-Grad-Project/site-survey/issues."}]');
				} else res.json(data);
			});
		});
	});

	router.get('/:key/stats/:questionnaire', function(req, res) {
		var key = req.params.key;
		var questionnaire = req.params.questionnaire;

		verifyKey(key, function(err, userKey){
			if(err){
				console.log(err);
				res.json('[{error:"*Denied Access* Key not found!"}]');
			} else data.survey.R.surveyResult({id:questionnaire}, function(err, data){
				if(err){
					console.log(err);
					res.json('[{error:"Unknown problem extracting data.  Please report to https://github.com/BClark-Grad-Project/site-survey/issues."}]');
				} else res.json(data);
			});
		});
	});
	
	
	return router;
};   