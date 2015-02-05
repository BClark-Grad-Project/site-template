/**
 * New node file
 */

// Related statistic items.
var indexOfTask    = function(task, searchTerm) {
    for(var i = 0, len = task.length; i < len; i++) {
        if (task[i].id === searchTerm) return i;
    }
    return -1;
};

var indexOfIter    = function(iterations, searchTerm) {
    for(var i = 0, len = iterations.length; i < len; i++) {
        if (iterations[i].id.toString() == searchTerm.toString()) return i;
    }
    return -1;
};

// Statistic data and functions.
var statistics = {
		iteration:[], 
		task:[],
		stories:{},
		totals:{}
};

var initIteration = function(pos){
	var iteration = {
			id:{}, 
			task:0,
			stories:0,
			weight:0,
			complete:0,
			taskfinished:0,
			storiesfinished:0
	};
	
	iteration.id = projectObj.iteration[pos].id;	
	return iteration;
};

var initTask = function(pos){
	var counts = {
			count:0,
			complete:0,
			weight:0,
			storiesfinished:0};
	var task = {
			id:{},
			stories:counts};

	for(var i in projectObj.iteration){
		if(projectObj.task[pos].iteration){
			if(projectObj.task[pos].iteration.toString() == projectObj.iteration[i].id.toString()){
				statistics.iteration[i].task++;
			}
		}
	}
	task.id = projectObj.task[pos].id;	
	
	
	return task;
};

var getStoryStats = function(){
	if(projectObj.task){
		for(var i in projectObj.task){
			if(projectObj.task[i].status == 'Complete'){
				statistics.task[i].stories.taskfinished++;
			}
			if(projectObj.stories){
				for(var j in projectObj.stories){
					if(projectObj.stories[j].task){
						if(projectObj.task[i].id.toString() == projectObj.stories[j].task.toString()){
							//Story totals
							statistics.stories.active++;
							statistics.stories.weight += projectObj.stories[j].weight;
							if(projectObj.stories[j].status != 'Complete'){
								statistics.stories.inProgress++;
							}
							
							//task totals
							statistics.task[i].stories.count++;
							statistics.task[i].stories.weight += projectObj.stories[j].weight;
							if(projectObj.stories[j].status == 'Complete'){
								statistics.task[i].stories.complete += projectObj.stories[j].weight;
								statistics.task[i].stories.storiesfinished++;
								statistics.stories.complete++;
							}
							
						}
					}
				}
			}
		}
	}
};

var calculateTime = function(){	
	var totalHours = 0;
	var projected = 0;
	for(var i in statistics.iteration){
		var timeSpan      = new Date(projectObj.iteration[i].stop).getTime() - new Date(projectObj.iteration[i].start).getTime();
		var workWeekSpan  = timeSpan / 604800000;                         // Span of weeks in iteration.
		var workSpan      = workWeekSpan * 72000000;                      // Hours to be worked in iteration (based on 20 hour work week)
		var workUnit      = workSpan / statistics.iteration[i].weight;    // Cost of iteration weight unit in time.
		var workComplete  = (workUnit * statistics.iteration[i].complete);// Total time covered by finished work.
		var workTotal     = (workUnit * statistics.iteration[i].weight);  // Total load of work. Should be equal to workSpan.
		var remainingWork = workTotal - workComplete;                     // remaining work in milliseconds
		var workHours     = remainingWork / 3600000;                      // remaining work in hours

		var onTime        = 'Schedule On Time';
		var daysInSpan     = (Date.now() - new Date(projectObj.iteration[i].start).getTime());
		var daysInWeekSpan = daysInSpan / 604800000;
		var daysInWeek     = daysInWeekSpan * 72000000;
		var daysIn         = daysInWeek * workUnit;
		
		daysIn = daysInWeek / 3600000;
		if(daysIn < 0){
			daysIn = workHours;
			
		}
		console.log(daysIn, (workComplete / 3600000));
		// Project On Time Status Element 
		if(0 > (workComplete / 3600000)){
			onTime = 'Behind Schedule';
		} else if (daysIn < (workComplete / 3600000)){
			onTime = 'Ahead of Schedule';
		} 
		totalHours += workHours;
		//Iter total time calculation
		statistics.iteration[i].timeremaining = workHours;
		statistics.iteration[i].status = onTime;
		// Project total time calculation
		projected += daysIn;
		
		console.log(daysIn, projected, statistics.iteration[i].timeremaining, workHours, statistics.iteration[i].projected);
	}

	statistics.totals.projected = projected;
	statistics.totals.timeremaining = totalHours;
	// Project On Time Status Element 
	if(statistics.totals.timeremaining < statistics.totals.projected){
		statistics.totals.status = 'Behind Schedule';
	} else if (statistics.totals.timeremaining > statistics.totals.projected){
		statistics.totals.status = 'Ahead of Schedule';
	} else {
		statistics.totals.status = 'Schedule On Time';
	}
	
};

var calculateIter = function(){	
	var taskCount = 0;
	var storyCount = 0;
	var weightCount = 0;
	var completedWeight = 0;
	var taskFinished = 0;
	var storiesFinished = 0;	
	
	for(var i in statistics.iteration){	
		var taskCountIter = 0;
		var storyCountIter = 0;
		var weightCountIter = 0;
		var completedWeightIter = 0;	
		for(var j in statistics.task){
			if(projectObj.task[j].iteration){
				if(statistics.iteration[i].id.toString() == projectObj.task[j].iteration.toString()){
					taskCountIter++;
					storyCountIter      += statistics.task[j].stories.count;
					weightCountIter     += statistics.task[j].stories.weight;		
					completedWeightIter += statistics.task[j].stories.complete;
					if(projectObj.task[j].status == 'Complete'){
						taskFinished++;
						statistics.iteration[i].taskfinished++;
					}
					for(var n in projectObj.stories){
						if(projectObj.stories[n].task){
							if(statistics.task[j].id.toString() == projectObj.stories[n].task.toString()){
								if(projectObj.stories[n].status == 'Complete'){
									statistics.iteration[i].storiesfinished += statistics.task[j].stories.storiesfinished;
									storiesFinished += statistics.task[j].stories.storiesfinished;
								}						
							}
						}
					}
				}
			}
		}
		statistics.iteration[i].stories  = storyCountIter;
		statistics.iteration[i].task     = taskCountIter;
		statistics.iteration[i].weight   = weightCountIter;
		statistics.iteration[i].complete = completedWeightIter;
		
		// project totals
		taskCount       += taskCountIter;
		storyCount      += storyCountIter;
		weightCount     += weightCountIter;		
		completedWeight += completedWeightIter;
	}

	statistics.totals.stories  = storyCount;
	statistics.totals.task     = taskCount;
	statistics.totals.storiesfinished = storiesFinished;
	statistics.totals.taskfinished    = taskFinished;
	statistics.totals.weight   = weightCount;
	statistics.totals.complete = completedWeight;
};

var setStatistics = function(){
	if(statistics.iteration){
		for(var i in statistics.iteration){
			var pos = parseInt(i) + 1;
			//set task counter element
			$('#sprint' + pos + '-task').html('<span class="glyphicon glyphicon-th-large"></span> ' + statistics.iteration[i].task);
			
			//set story counter element
			$('#sprint' + pos + '-stories').html('<span class="glyphicon glyphicon-th"></span> ' + statistics.iteration[i].stories);
			
			//set project status detail cards
			if(projectObj.iteration[i].status == 'Active'){
				$('#sprint-name').html(projectObj.iteration[i].name);
				$('#total-sprint-task').html((statistics.iteration[i].task));
				$('#total-sprint-stories').html(statistics.iteration[i].stories);
				$('.sprint-completion').html(((statistics.iteration[i].complete/statistics.iteration[i].weight)*100).toFixed(2) + '%');
				$('#remaining-sprint-task').html((statistics.iteration[i].task - statistics.iteration[i].taskfinished));
				$('#remaining-sprint-stories').html(statistics.iteration[i].stories - statistics.iteration[i].storiesfinished);
				$('#sprint-completion').attr('aria-valuenow', ((statistics.iteration[i].complete/statistics.iteration[i].weight)*100).toFixed(2) + '%');
				$('#sprint-completion').css('width', ((statistics.iteration[i].complete/statistics.iteration[i].weight)*100).toFixed(2) + '%');
				$('#status-sprint-time').html(statistics.iteration[i].status);
				$('#remaining-sprint-time').html(statistics.iteration[i].timeremaining.toFixed(2) + ' hours');
			}
		}
	}

	if(statistics.task){
		for(var i in statistics.task){
			//set task story counter element
			if(statistics.task[i].id && statistics.task[i].stories.count){$('#' + statistics.task[i].id.toString() + '-stories').html('<span class="glyphicon glyphicon-th"></span> ' + (statistics.task[i].stories.count));}
			
			//set task weight average
			if(statistics.task[i].stories.weight > 0){$('#' + statistics.task[i].id.toString() + '-weight').html('<span class="glyphicon glyphicon-scale"></span> ' + ((statistics.task[i].stories.weight)));}
		}
	}
	
	$('#remaining-task').html(statistics.totals.task - statistics.totals.taskfinished);
	$('#remaining-stories').html(statistics.totals.stories - statistics.totals.storiesfinished);
	$('#total-sprints').html(statistics.iteration.length);
	$('#total-task').html(statistics.totals.task);
	$('#total-stories').html(statistics.totals.stories);
	$('.project-completion').html(((statistics.totals.complete/statistics.totals.weight)*100).toFixed(2) + '%');
	$('#project-completion').attr('aria-valuenow', (((statistics.totals.complete/statistics.totals.weight)*100).toFixed(2) + '%'));
	$('#project-completion').css('width', ((statistics.totals.complete/statistics.totals.weight)*100).toFixed(2) + '%');
	$('#status-time').html(statistics.totals.status);
	$('#remaining-time').html(statistics.totals.timeremaining.toFixed(2) + ' hours');
};



var initStatistics = function(){
	// Define values to measure.
	statistics.stories = {
			   total:projectObj.stories.length,
	           active:0,
	           complete:0,
			   weight:0,
	           inProgress:0};
	for(var i in projectObj.iteration){
		statistics.iteration.push(initIteration(i));
	}
	for(var i in projectObj.task){
		statistics.task.push(initTask(i));
	}
    getStoryStats();
    calculateIter();
    calculateTime();
    setStatistics();
    console.log(statistics);
};

// Remains at bottom of statistics.js
initStatistics();

var clearForm = function(){
    $("input[name=id]").val( '' );
    $("input[name=name]").val( '' );
    $("textarea[name=description]").val( '' );
    $("input[name=sprint]").val( '' );
    $("select").prop('selectedIndex',0);
};

$(document).on("click", "#story-edit", function () {
    var Id = parseInt($(this).data('id'));
    clearForm();
    if(projectObj.stories[Id]){
	    $("input[name=id]").val( projectObj.stories[Id].id );
	    $("input[name=name]").val( projectObj.stories[Id].name );
	    $("textarea[name=description]").val( projectObj.stories[Id].description );
	    $("option[value=" + projectObj.stories[Id].task + "]").attr('selected', 'selected');
	    $("option[value=" + projectObj.stories[Id].weight + "]").attr('selected', 'selected');
	    $("option[value=" + projectObj.stories[Id].status + "]").attr('selected', 'selected');
    }
});

$(document).on("click", "#task-edit", function () {
    var Id = parseInt($(this).data('id'));
    clearForm();
    if(projectObj.task[Id]){
	    $("input[name=id]").val( projectObj.task[Id].id );
	    $("input[name=name]").val( projectObj.task[Id].name );
	    $("textarea[name=description]").val( projectObj.task[Id].description );
	    $("option[value=" + projectObj.task[Id].iteration + "]").attr('selected', 'selected');
	    $("option[value=" + projectObj.task[Id].status + "]").attr('selected', 'selected');
    }
});

$(document).on("click", "#sprint-edit", function (e) {
    var Id = parseInt($(this).data('id'));
    clearForm();
    
    $("input[name=id]").val( projectObj.iteration[Id].id );
    $("input[name=start]").val(projectObj.iteration[Id].start.substr(0,10));
    $("input[name=stop]").val(projectObj.iteration[Id].stop.substr(0,10));
    
    $("textarea[name=product]").val( projectObj.iteration[Id].product );
});

$(document).on("click", "#project-edit", function (e) { 
	clearForm();
    $("input[name=id]").val( projectObj.id );
    $("input[name=name]").val( projectObj.name );
    $("input[name=start]").val(projectObj.start.substr(0,10));
    $("input[name=stop]").val(projectObj.stop.substr(0,10));
    $("textarea[name=vision]").val( projectObj.vision );
    $("textarea[name=description]").val( projectObj.description );
});

$(document).on("click", ".new-form", function (e) {    
	clearForm();
});