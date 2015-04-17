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
	if(Obj.response) $('#form-survey-detail textarea[name=response]').text(Obj.response);
	// header ??
	// catagory ??
	$('#select-detail').collapse('hide');
};