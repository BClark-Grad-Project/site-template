$(function () {
  $('[data-toggle="tooltip"]').tooltip();  // Required for bootstrap tool-tip

});
var dragSrcEl = null;
function storyToTask(e){
	var form = document.createElement('form');
	var story = document.createElement('input');
	var task = document.createElement('input');

   // var el = document.getElementById(e.dataTransfer.getData('Text'));
	  // this/e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }

	form.setAttribute('action', '/project/update/story');
	form.setAttribute('method', 'POST');
	task.setAttribute('name', 'task');
	task.setAttribute('type', 'hidden');
	task.setAttribute('value', e.target.id);
	story.setAttribute('name', 'story');
	story.setAttribute('type', 'hidden');
	story.setAttribute('value', dragSrcEl.id);
	form.appendChild(task);
	form.appendChild(story);
	form.submit();

	  return false;
}

function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
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
		e.target.style.opacity = '0.4';
	}
}

$('.panel.story-item').hover(
	function(){
		$(this).css('border-width',2);
		$(this).parent().css('padding-bottom',13);
	},function(){
		$(this).css('border-width',1);
		$(this).parent().css('padding-bottom',15);
});

function handleDragEnter(e) {
  // this / e.target is the current hover target.
	if($(e.target).hasClass('task-item')){
		e.target.style.opacity = '0.4';
	}     	
}

function handleDragLeave(e) {
	if($(e.target).hasClass('task-item')){
  		e.target.style.opacity = '1';
	} 
}
function handleDrop(e) {

	//  dragSrcEl = this;
    //storyToTask(e);
	  // this/e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }

	  // Don't do anything if dropping the same column we're dragging.
	  if (dragSrcEl != this) {
	    // Set the source column's HTML to the HTML of the column we dropped on.
		  storyToTask(e);
	  }

	  return false;
}


var cols = document.querySelectorAll('.story-item, .task-item');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false);
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
});
