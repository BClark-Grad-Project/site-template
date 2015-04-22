/**
 * New node file
 */
var setFormDetails = function(Obj){
	$('#form-survey-detail').attr("action", "/survey/update/" + Obj.id);
	if(Obj.name) $('#form-survey-detail input[name=name]').val(Obj.name);
	if(Obj.description) $('#form-survey-detail textarea[name=description]').text(Obj.description);
	if(Obj.conductor) $('#form-survey-detail input[name=conductor]').val(Obj.conductor);
	if(Obj.website) $('#form-survey-detail input[name=website]').val(Obj.website);
	if(Obj.email) $('#form-survey-detail input[name=email]').val(Obj.email);
	if(Obj.end) $('#form-survey-detail .input-group.date').datepicker('setDate',new Date(Obj.end));
	if(Obj.response) $('#form-survey-detail textarea[name=response]').text(Obj.response);
	// header ??
	if(Obj.header) $('#header-preview').css('background-image', 'url(' + Obj.header + ')');
	if(Obj.catagory) $('#form-survey-detail select[name=catagory]').val(Obj.catagory);
	$('#select-detail').collapse('hide');
};

$('#form-survey-detail .input-group.date').datepicker({
    autoclose: true,
    todayHighlight: true
});

var loadHeaderPreview = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      $('#header-preview').css('background-image', 'url(' + reader.result + ')');
    };
    reader.readAsDataURL(event.target.files[0]);
};

var resetQuestionForm = function(survey){
	$('#single-question-form').attr("action", "/survey/create/question/add/" + survey );
	$('#multi-question-form').attr("action", "/survey/create/question/add/" + survey );
	$('textarea[name=question]').text('');
};

var openQuestion = function(content){
	if(content.type == 'single'){
		$('#single-question-form').attr("action", "/survey/create/question/" + content.survey + "/" + content.id );
		$('#new-single-question').collapse('show');
	} else if(content.type == 'multi'){
		$('#multi-question-form').attr("action", "/survey/create/question/" + content.survey + "/" + content.id );
		$('#new-multi-question').collapse('show');
	}
    $('.back-btn').removeClass('hide');
    $('#my-questions').collapse('hide');
    $('#select-question').collapse('hide');
    $('textarea[name=question]').text(content.question);
	var table = $('.option-list');
	
	if(content.options){
		for(var i in content.options){
			var displayVal = '';
			if(content.options[i].option == 'provide') displayVal = content.options[i].response;
			if(content.options[i].option == 'open') displayVal = '<i>User will provide ' + content.options[i].label + ' answer.</i>';
			if(content.options[i].option == 'opinion') displayVal = '<i>User Opinion Response</i>';
            var pos = i;
            pos++;
			table.append('<tr>');
			table.append('<th style="width:3%;"><small style="opacity:0.5;">' + pos + '</small></th>');
			table.append('<td style="width:77%;">' + displayVal + '</td>');
			table.append('<td style="width:20%;"><ul class="nav nav-pills"><li class="pull-right" role="presentation"><a href="/survey/create/question/delete/' + content.survey + '/' + content.id + '/' + content.options[i].id + '" class="btn-sm">Delete</a></li></ul></td>');
			table.append('</tr>');
		}
		$('.option-selection-choices').collapse('show');
		$('.option-list').collapse('show');
	}
};

var loadQuestion = function(question, survey){
	var content = {};
	for(var i in survey.questions){
		if(survey.questions[i].id == question){
			content = survey.questions[i];
			content.options = [];
			for(var j in survey.options){
				if(survey.options[j].question == question){
					content.options.push(survey.options[j]);
				}
			}
		}
	}
	openQuestion(content);
};