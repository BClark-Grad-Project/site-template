$(document).ready(function() {
	$('#register-form input[name=password_2]').parent().hide();
	$('[data-toggle="tooltip"]').tooltip();
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
	
	// Login Form Validation
	var validateLoginFields = {
			user: function(){
				var empty_user = isFieldEmpty('#login-form', 'user');
				return empty_user;
			},
			password: function(){
				var $pass = $('#login-form input[name=password]');				
				var empty_pass = isFieldEmpty('#login-form', 'password');
				if(!empty_pass || $pass.val().length < 5){
					return false;
				}
				return true;					
			},
			remember: function(){
				
			}
	};
	
	// Register Form Validation
	var validateRegisterFields = {
			name: function(){
				var empty_name   = isFieldEmpty('#register-form', 'name');
				if(!empty_name){return false;}

				return true;
			},
			email: function(){
				// Is a email? HTML 5 require parameter sucks for this.
				var $email = $('#register-form input[name=email]');
				var isValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($email.val());
				if(!isValid){
					$email.next().hide();
					return false;
				}
				$email.next().show();
				
				// Is empty?
				var empty_email  = isFieldEmpty('#register-form', 'email');
				if(!empty_email){
					return false;
				}
				
				return true;
			},
			password: function(){
				var empty_pass   = isFieldEmpty('#register-form', 'password');	
				var $pass = $('#register-form input[name=password]');
				var $pass_2 = $('#register-form input[name=password_2]');

				
				if(!empty_pass || $pass.val().length < 5){
					$pass.next().hide(); 
					$pass_2.val('').parent().hide();
					return false;
				} else if($pass.val().length >= 5) {
					$pass_2.parent().show();
					$pass.next().show();
				}
				if($pass.val() != $pass_2.val()){
					$pass_2.next().hide();
					return false;
				} else {
					$pass_2.next().show();
				}

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
				return empty_agree;
			}
	};
	
	// Start Validation Event Listeners
	function requiredRegisterFields(){
		var name  = validateRegisterFields.name();
		var email = validateRegisterFields.email();
		var pass  = validateRegisterFields.password();
		var accept= validateRegisterFields.agree();
		
		if(name && email && pass && accept){
			toggleSubmit('#register-form', false);
		} else {
			toggleSubmit('#register-form', true);
		}
	}
	$('#login-form :input').on('keyup change', function(){
		var user = validateLoginFields.user();
		var pass = validateLoginFields.password();
		
		console.log(user, pass);
		if(user && pass){
			toggleSubmit('#login-form', false);
		} else {
			toggleSubmit('#login-form', true);
		}
		
		validateLoginFields.remember();
	});
	$('#register-form :input').on('keyup change', function(){
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
});