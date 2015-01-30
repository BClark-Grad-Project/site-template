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
		stories:{}};

var initIteration = function(pos){
	var iteration = {
			id:{}, 
			task:0,
			stories:0};
	
	iteration.id = projectObj.iteration[pos].id;	
	return iteration;
};

var initTask = function(pos){
	var counts = {
			count:0,
			weight:0};
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

var getStoryStats = function(stories){
	for(var i in stories){
		statistics.stories.active++;
		if(stories[i].status == 'Active'){
			statistics.stories.inProgress++;
		}
		if(stories[i].weight){
			statistics.stories.weight += stories[i].weight;
		}
		if(stories[i].task){
			for(var j in projectObj.task){
				if(stories[i].weight){
					if(stories[i].task.toString() == projectObj.task[j].id.toString()){
						statistics.task[j].stories.weight += stories[i].weight;
					}
				}
				if(stories[i].task.toString() == projectObj.task[j].id.toString()){
					statistics.task[j].stories.count++;
					if(projectObj.task[j].iteration){
						for(var n in projectObj.iteration){
							if(projectObj.task[j].iteration.toString() == projectObj.iteration[n].id.toString()){
								statistics.iteration[n].stories++;
							}
						}
					}
				}
			}
		}
	}
	
};

var setStatistics = function(){
	
	for(var i in statistics.iteration){
		var pos = parseInt(i) + 1;
		var task = '#sprint' + pos + '-task';
		if(statistics.iteration[i].task){
			$(task).html('<span class="glyphicon glyphicon-th-large"></span> ' + statistics.iteration[i].task);
		}
		if(statistics.iteration[i].iteration){
			$('#sprint' + pos + '-stories').html('<span class="glyphicon glyphicon-th"></span> ' + statistics.iteration[i].stories);
		}
	}

/*	for(var i in  statistics.task){
		if(statistics.task[i].stories.weight > 0){$('#' + statistics.task[i].id.toString() + '-weight').html('<span class="glyphicon glyphicon-scale"></span> ' + (statistics.iteration[i].weight));}
	}*/

	if(statistics.task){
		for(var i in  statistics.task){
			if(statistics.task[i].id && statistics.task[i].stories.count){$('#' + statistics.task[i].id.toString() + '-stories').html('<span class="glyphicon glyphicon-th"></span> ' + (statistics.task[i].stories.count));}
			if(statistics.task[i].stories.weight > 0){$('#' + statistics.task[i].id.toString() + '-weight').html('<span class="glyphicon glyphicon-scale"></span> ' + (statistics.task[i].stories.weight));}
		}
	}
};

var initStatistics = function(){
	// Define values to measure.
	statistics.stories = {
			   total:projectObj.stories.length,
	           active:0,
			   weight:0,
	           inProgress:0};
	for(var i in projectObj.iteration){
		statistics.iteration.push(initIteration(i));
	}
	for(var i in projectObj.task){
		statistics.task.push(initTask(i));
	}
    getStoryStats(projectObj.stories);
    console.log(statistics);
    setStatistics();
};

// Remains at bottom of statistics.js
initStatistics();


$(document).on("click", "#story-edit", function () {
    var Id = parseInt($(this).data('id'));
    console.log( projectObj.stories[Id].id);
    if(projectObj.stories[Id]){
	    $("input[name=id]").val( projectObj.stories[Id].id );
	    $("input[name=name]").val( projectObj.stories[Id].name );
	    $("textarea[name=description]").val( projectObj.stories[Id].description );
	    $("option[value=" + projectObj.stories[Id].task + "]").attr('selected', 'selected');
	    $("option[value=" + projectObj.stories[Id].weight + "]").attr('selected', 'selected');
    }
});

$(document).on("click", "#task-edit", function () {
    var Id = parseInt($(this).data('id'));
    console.log( projectObj.task[Id].id);
    if(projectObj.task[Id]){
	    $("input[name=id]").val( projectObj.task[Id].id );
	    $("input[name=name]").val( projectObj.task[Id].name );
	    $("textarea[name=description]").val( projectObj.task[Id].description );
	    $("option[value=" + projectObj.task[Id].iteration + "]").attr('selected', 'selected');
    }
});

$(document).on("click", "#sprint-edit", function (e) {
    var Id = parseInt($(this).data('id'));
    console.log(Id, projectObj.iteration[Id].start.substr(0,10));
    
    $("input[name=id]").val( projectObj.iteration[Id].id );
    $("input[name=start]").val(projectObj.iteration[Id].start.substr(0,10));
    $("input[name=stop]").val(projectObj.iteration[Id].stop.substr(0,10));
    
    $("textarea[name=product]").val( projectObj.iteration[Id].product );
});