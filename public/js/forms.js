$(function () {
	// Extend jQuery functions for .disable class toggle (IE compatibility trick)
	jQuery.fn.extend({
	    disable: function(state) {
	        return this.each(function() {
	            var $this = $(this);
	            $this.toggleClass('disabled', state);
	        });
	    }
	});	
	jQuery.fn.notEmpty = function() {
        var $this = $(this);
        if($this.val() != '')
			return true;
		return false;
	};	
	function toggleSubmit(form, toggle){
		$(form + ' button[type=submit]').disable(toggle);
	}	
	function isFieldEmpty(form, name){
		var field = $(form + ' input[name=' + name + ']').notEmpty();
		return field;
	}	
	
	// Character input control for form elements.
	$('input[name=first], input[name=last], input[name=middle]').keypress(function(e){
		  var ew = e.which;
		  if(ew == 32)
		    // Spacebar
		    return true;
		  if(65 <= ew && ew <= 90)
		    // a-z
		    return true;
		  if(97 <= ew && ew <= 122)
		    // a-z
		    return true;
		  return false;
		});
	
	$('input[name=name], input[name=user]').keypress(function(e){
		  var ew = e.which;
		  if(ew == 46)
			  // period
			  return true;
		  if(ew == 64)
			  // @
			  return true;
		  if(48 <= ew && ew <= 57)
			  // 0-9
		      return true;
		  if(65 <= ew && ew <= 90)
			  // A-Z
			  return true;
		  if(97 <= ew && ew <= 122)
			  // a-z
			  return true;
		  return false;
		});

	$('input[name=password]').keypress(function(e){
		  var ew = e.which;
		  if(ew == 32)
			 // Spacebar
			 return false;
		  return true;
		});
	
});
