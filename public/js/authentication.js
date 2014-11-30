$(document).ready(function() {
	$('#register-form input[name=password_2]').parent().hide(); // If js disabled, show verification field anyway.
	$('.collapse').collapse('hide');// Because we want to use these as normal methods in other views.

	function toggleSubmit(form, toggle){
		$(form + ' button[type=submit]').disable(toggle);
	}	
	function isFieldEmpty(form, name){
		var field = $(form + ' input[name=' + name + ']').notEmpty();
		return field;
	}	
	// Register profile detail options. 
	$('.profile-option-group > a').on('click', function(e){
		var $this = $(this);
		if($this.text().charAt(0) == '+'){
			$this.html($this.html().replace('+','- '));
		} else {
			$this.html($this.html().replace('- ','+'));
		}
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
				// TODO realname: function()
			},
			phone:function(){
				// TODO phone:function()
			},
			addrLine: function(){
				//TODO addrLine: function()
			},
			country: function(){
				//TODO country: function()
			},
			city: function(){
				//TODO city: function()
			},
			state: function(){
				//TODO state: function()
			},
			zip: function(){
				//TODO zip: function()
			},
			agree: function(){
				var empty_agree  = $('#register-form input[name=agree]').is(':checked');
				return empty_agree;
			}
	};
	
	// Start Validation Event Listeners
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
	function requiredRegisterFields(){
		// When minimum requirements are met for creating a account enable submit button. Else disable.
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