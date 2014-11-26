$(document).ready(function() {
	function addFrontPageOption(val){
		if($('input:checkbox[name='+ val +']')){
			val = 'front_' + val;
			$('input:checkbox[name='+ val +']').parent().parent().removeClass('hide').show();
		} 
	}

	function removeFrontPageOption(val){
		if($('input:checkbox[name='+ val +']')){
			val = 'front_' + val;
			$('input:checkbox[name='+ val +']').parent().parent().hide();
		} 
	}
	
	$('#content-module-form :checkbox').change(function(){
		if(this.checked){
			addFrontPageOption(this.name);
		} else {
			removeFrontPageOption(this.name);
		}
	});
});