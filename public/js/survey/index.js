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