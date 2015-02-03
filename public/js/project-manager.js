var dragSrcEl = null;
function storyToTask(e){
	var form = document.createElement('form');
	var story = document.createElement('input');
	var task = document.createElement('input');
	var status = document.createElement('input');

   // var el = document.getElementById(e.dataTransfer.getData('Text'));
	  // this/e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }

	form.setAttribute('action', '/project/update/story');
	form.setAttribute('method', 'POST');
	story.setAttribute('name', 'id');
	story.setAttribute('type', 'hidden');
	story.setAttribute('value', dragSrcEl.id);
	task.setAttribute('name', 'task');
	task.setAttribute('type', 'hidden');
	task.setAttribute('value', e.target.id);
	status.setAttribute('name', 'status');
	status.setAttribute('type', 'hidden');
	status.setAttribute('value', $(e.target).attr('status'));
	form.appendChild(task);
	form.appendChild(story);
	form.appendChild(status);
	form.submit();

	  return false;
}

function handleDragStart(e) {

	if($(this).hasClass('story-item')){
  this.style.opacity = '0.4';  // this / e.target is the source node.
	}
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.id);
  
  $(document).mousemove(function(){
		e.target.style.opacity = '1';
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
	    e.preventDefault(); // Necessary. Allows us to drop.
  }

  if($(e.target).hasClass('task-item')){
	if($(dragSrcEl).hasClass('story-item')){
		e.target.style.opacity = '0.4';
	}
  }  
}

$('.panel.story-item').hover(
	function(){
		$(this).css('border-width',2);
		$(this).parent().css('padding',3);
		$(this).parent().css('padding-left',5);
		$(this).parent().css('padding-right',5);		
		$(this).parent().css('padding-top',0);
	},function(){
		$(this).css('border-width',1);
		$(this).parent().css('padding', 5);
		$(this).parent().css('padding-top',0);
});

function handleDragEnter(e) {
  // this / e.target is the current hover target.
	if($(e.target).hasClass('task-item')){

		if($(dragSrcEl).hasClass('story-item')){
			e.target.style.opacity = '0.4';
		}
	}     	
}

function handleDragLeave(e) {
	if($(e.target).hasClass('task-item')){
  		e.target.style.opacity = '1';
	} 
}
function handleDrop(e) {

	if($(dragSrcEl).hasClass('story-item')){
		//  dragSrcEl = this;
	    //storyToTask(e);
		  // this/e.target is current target element.
	 
		  // Don't do anything if dropping the same column we're dragging.
		  if (dragSrcEl != this) {
		    // Set the source column's HTML to the HTML of the column we dropped on.
			  storyToTask(e);
		  }
	}
	return false;
}


var storyTask = document.querySelectorAll('.story-item, .task-item');
[].forEach.call(storyTask, function(st) {
	st.addEventListener('dragstart', handleDragStart, false);
	st.addEventListener('dragenter', handleDragEnter, false);
	st.addEventListener('dragover', handleDragOver, false);
	st.addEventListener('dragleave', handleDragLeave, false);
});

var storyTaskDrop = document.querySelectorAll('.task-item');
[].forEach.call(storyTaskDrop, function(st) {
	st.addEventListener('drop', handleDrop, false);
});

function taskToIteration(e){
	var form = document.createElement('form');
	var iteration = document.createElement('input');
	var task = document.createElement('input');
	var status = document.createElement('input');

   // var el = document.getElementById(e.dataTransfer.getData('Text'));
	  // this/e.target is current target element.

	console.log(e.target.status);
	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }
	form.setAttribute('action', '/project/update/task');
	form.setAttribute('method', 'POST');
	iteration.setAttribute('name', 'iteration');
	iteration.setAttribute('type', 'hidden');
	iteration.setAttribute('value', e.target.id);
	task.setAttribute('name', 'id'); 
	task.setAttribute('type', 'hidden');
	task.setAttribute('value', dragSrcEl.id);
	status.setAttribute('name', 'status');
	status.setAttribute('type', 'hidden');
	status.setAttribute('value', $(e.target).attr('status'));
	form.appendChild(task);
	form.appendChild(iteration);
	form.appendChild(status);
	form.submit();

	  return false;
}

function handleTiDragStart(e) {
	if($(this).hasClass('task-item')){
		$(this).css('border-width',1);  // this / e.target is the source node.
		this.style.opacity = '0.4';  // this / e.target is the source node.
	}
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.id);
  
  $(document).mousemove(function(){
		e.target.style.opacity = '1';
  });
}

function handleTiDragOver(e) {
	  if (e.preventDefault) {
		    e.preventDefault(); // Necessary. Allows us to drop.
		  }

	if($(e.target).hasClass('iteration-item')){

		if($(dragSrcEl).hasClass('task-item')){
			e.target.style.opacity = '0.4';
			dragSrcEl.style.opacity = '0.4';
		}
	}
}

$('.panel.task-item').hover(
	function(){
		$(this).css('border-width',0);
		$(this).parent().css('padding',5);
		$(this).parent().css('padding-left',3);
		$(this).parent().css('padding-right',3);		
		$(this).parent().css('padding-top',0);
	},function(){
		$(this).css('border-width',1);
		$(this).parent().css('padding',3);
		$(this).parent().css('padding-top',0);
});

function handleTiDragEnter(e) {
  // this / e.target is the current hover target.
	if($(e.target).hasClass('iteration-item')){
		if($(dragSrcEl).hasClass('task-item')){
			e.target.style.opacity = '0.4';
			dragSrcEl.style.opacity = '0.4';
		}
	} 	
}

function handleTiDragLeave(e) {
	if($(e.target).hasClass('iteration-item')){
  		e.target.style.opacity = '1';
	} 
}
function handleTiDrop(e) {
	if($(dragSrcEl).hasClass('task-item')){
		//  dragSrcEl = this;
		  // this/e.target is current target element.
	
	
		  // Don't do anything if dropping the same column we're dragging.
		  if (dragSrcEl != this) {
		    // Set the source column's HTML to the HTML of the column we dropped on.
			  taskToIteration(e);
		  }
	}
	  return false;
}

var taskIteration = document.querySelectorAll('.task-item, .iteration-item');
[].forEach.call(taskIteration, function(ti) {
	ti.addEventListener('dragstart', handleTiDragStart, false);
	ti.addEventListener('dragenter', handleTiDragEnter, false);
	ti.addEventListener('dragover', handleTiDragOver, false);
	ti.addEventListener('dragleave', handleTiDragLeave, false);
});

var taskIterationDrop = document.querySelectorAll('.iteration-item');
[].forEach.call(taskIterationDrop, function(ti) {
	ti.addEventListener('drop', handleTiDrop, false);
});

