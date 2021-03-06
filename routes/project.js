module.exports = function (data) {
	var express   = require('express');
	var router    = express.Router();
	var createObj = require('./objects/projects');
	var marked = require('marked');

	/* GET about */
	router.get('/', function(req, res) {
		data.project.read({active:true}, function(err, project){
			if(err){console.error(err);}
			if(!project){
				res.render('project/index', {title:"About Mind Research Project", user: req.session.user });
			} else {
				console.log('manage', project, err);
				
/*				if(project.description){
					project.description = marked(project.description);
				}
				if(project.vision){
					project.vision = marked(project.vision);
				}*/
				
				res.render('project/index', {project:project,  title:"About Mind Research Project", user: req.session.user });
			}
		});	
		
	});

	/* GET status */
	router.get('/status', function(req, res) {
		data.project.read({active:true}, function(err, project){
			if(err){console.error(err);}
			if(!project){
				res.render('project/detail', { title:"Project Mind Research Status", user: req.session.user });
			} else {
				if(project.description){
					project.description = marked(project.description);
				}
				if(project.vision){
					project.vision = marked(project.vision);
				}
				
				console.log('manage', project, err);
				res.render('project/detail', { project:project, title:"Project Mind Research Status", user: req.session.user });
			}
		});	
		
	});

	/* GET-POST project */
	router.post('/create', data.auth.grantAdmin, function(req, res) {
		var projectObj = createObj.newProject(req);
		data.project.create(projectObj, function(err, project){
			if(err){console.error(err);}
			
			res.redirect('/project/manage');
		});
	});
	
	/* GET-POST sprint task */
	router.post('/create/task', data.auth.grantAdmin, function(req, res) {
		var projectObj = {};
		projectObj.task = createObj.newTask(req);
		data.project.create(projectObj, function(err, project){
			if(err){console.error(err);}
			
			res.redirect('/project/manage#manage');
		});
	});

	/* GET-POST story */
	router.post('/create/story', data.auth.grantAdmin, function(req, res) {
		var projectObj = {};
		projectObj.story = createObj.newStory(req);
		data.project.create(projectObj, function(err, project){
			if(err){console.error(err);}
			
			res.redirect('/project/manage#manage');
		});
	});


	/* POST project update*/
	router.post('/update', data.auth.grantAdmin, function(req, res) {
		var Obj = createObj.projectUpdate(req);
		data.project.update(Obj, function(err, data){
			if(err){console.error(err);}
			
			res.redirect('/project/manage#manage');
		});	
	});

	/* POST project iteration update*/
	router.post('/update/iteration', data.auth.grantAdmin, function(req, res) {
		var Obj = {};
		Obj.iteration = createObj.iterationUpdate(req);
		data.project.update(Obj, function(err, data){
			if(err){console.error(err);}
			
			res.redirect('/project/manage');
		});	
	});

	/* POST project task update*/
	router.post('/update/task', data.auth.grantAdmin, function(req, res) {
		var Obj = {};
		Obj.task = createObj.taskUpdate(req);
		data.project.update(Obj, function(err, data){
			if(err){console.error(err);}
			
			res.redirect('/project/manage#manage');
		});	
	});

	/* POST project story update*/
	router.post('/update/story', data.auth.grantAdmin, function(req, res) {
		var Obj = {};
		Obj.story = createObj.storyUpdate(req);
		data.project.update(Obj, function(err, data){
			if(err){console.error(err);}
			
			res.redirect('/project/manage#manage');
		});	
	});

	/* GET project manager */
	router.get('/manage', data.auth.grantAdmin, function(req, res) {
		data.project.read({active:true}, function(err, project){
			if(err){console.error(err);}
			if(!project){
				res.render('project/manage', {title:"Create Project", user: req.session.user });
			} else {
				console.log('manage', project, err);
				if(project.description){
					project.description = marked(project.description);
				}
				if(project.vision){
					project.vision = marked(project.vision);
				}
				
				res.render('project/manage', {project:project, title:"Manage Project", user: req.session.user });
			}
		});		
	});
	
	return router;
};