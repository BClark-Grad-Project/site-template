$(document).ready(function() {
	$('#register-form input[name=password_2]').parent().hide();
	
	// REgister profile detail options. 
	$('.profile-option-group > a').on('click', function(e){
		var $this = $(this);
		if($this.text().charAt(0) == '+'){
			$this.html($this.html().replace('+','- '));
		} else {
			$this.html($this.html().replace('- ','+'));
		}
	});
	
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
	
	$('input[name=user]').keypress(function(e){
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
	
	// Login Form Validation
	var validateLoginFields = {
			user: function(name){
				var empty_user = isFieldEmpty('#login-form', 'user');
				
			},
			password: function(){
				var empty_pass = isFieldEmpty('#login-form', 'password');		
		
				
			},
			remember: function(){
				
			}
	};
	
	// Register Form Validation
	var validateRegisterFields = {
			user: function(){
				var empty_user   = isFieldEmpty('#register-form', 'user');
				if(!empty_user){return false;}

				return true;
			},
			email: function(){
				var empty_email  = isFieldEmpty('#register-form', 'email');
				if(!empty_email){return false;}
				
				return true;
			},
			password: function(){
				var empty_pass   = isFieldEmpty('#register-form', 'password');	
				var $pass = $('#register-form input[name=password]');
				var $pass_2 = $('#register-form input[name=password_2]');
				
				if(!empty_pass){return false;}
				else if ($pass.val().length >= 5){
					$pass_2.parent().show();
				}
				console.log($pass.val(), $pass_2.val());
				if($pass.val() != $pass_2.val()){return false;}
				this.agree();

				return true;
			},
			realname: function(){
				
			},
			phone:function(){
				
			},
			addrLine: function(){
				
			},
			country: function(){
				
			},
			city: function(){
				
			},
			state: function(){
				
			},
			zip: function(){
				
			},
			agree: function(){
				var empty_agree  = $('#register-form input[name=agree]').is(':checked');
				toggleSubmit('#register-form', !empty_agree);
			}
	};
	
	
	// Start Validation Event Listeners
	function isRequiredFieldEmpty(){
		var empty_user   = isFieldEmpty('#register-form', 'user');
		var empty_email  = isFieldEmpty('#register-form', 'email');
		var empty_pass   = isFieldEmpty('#register-form', 'password');	
		var empty_pass_2 = isFieldEmpty('#register-form', 'password_2');	
		var empty_agree  = $('#register-form input[name=agree]').is(':checked');
		
		var isEmpty = (empty_user && empty_email &&	empty_pass && empty_pass_2 && empty_agree);
		console.log(isEmpty);
		
		if(!isEmpty){
			toggleSubmit('#register-form', true);
		}
	}
	function requiredRegisterFields(){
		isRequiredFieldEmpty();
		var user  = validateRegisterFields.user();
		if(!user){return false;}
		var email = validateRegisterFields.email();
		if(!email){return false;}
		var pass  = validateRegisterFields.password();
		if(!pass){return false;}
	}
	$('#login-form :input').keyup(function(e){
		validateLoginFields.user();
		validateLoginFields.password();
		
		
		validateLoginFields.remember();
	});
	$('#register-form :input').keyup(function(e){
		requiredRegisterFields();
		
		
		validateRegisterFields.addrLine();
		validateRegisterFields.city();
		validateRegisterFields.country();
		validateRegisterFields.state();
		validateRegisterFields.zip();
		validateRegisterFields.phone();
	});
	$('#register-form :input').click(function(){
		requiredRegisterFields();
	});
	
	$('#register-form :input').submit(function (e) {
		  e.preventDefault();
		  var fd = new FormData($(this)[0]);
		  $.ajax({
		    data: fd,
		    processData: false,
		    contentType: false,
		    type: 'POST', 
		    success: function(data){
		    }
		  });
	});
});