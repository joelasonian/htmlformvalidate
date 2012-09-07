//Form Validation Plugin
//A Simple plugin that allows HTML only configuration of front end form validation

/***
1. Required
2. Numsonly
3. Minimum val?  (int only)
4. Maximum val?  (int only)
5. Email?
6. Required Only If Visible?
7. Exact Length Required?
8. Strict Match?
***/


(function($) {

    $.formValidate = function(element, options) {

        var defaults = {
			//When to Validate
			validateOnSubmit: true,
			//Error Class
			errorClass: 'error',
            //Required
			requiredClass: 'valrequired',
			//Numsonly
			numsOnlyClass: 'valnumsonly',
			//Minimum val?  (int only)
			minimumClass: 'valmin',
			//Maximum val?  (int only)
			maximumClass: 'valmax',
			//Email?
			emailClass: 'valemail',
			//Required Only If Visible?
			visibleReqClass: 'valifvisible',
			//Exact Length?
			exactlenClass: 'valexactlen',
			//Strict Match?
			strictMatchClass: 'valstrictmatch',
			//callback passthrough
            validCallback: function() {},
			invalidCallback: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

			if (plugin.settings.validateOnSubmit){
				$element.submit(function(){
					return plugin.validateForm();
				});
			} 
        }
		
		plugin.validateForm = function(){
			if (plugin.frmValidate($element)) {
				plugin.settings.validCallback();
				return true;
			} else {
				plugin.settings.invalidCallback();
				return false;
			}
		}
		
		plugin.frmValidate = function(form) {
		  var IsValid = true
		  $(form).find('*').each(function(){
			if(!plugin.validationStation($(this))){
			if (IsValid)IsValid = false;
		  }    
		  })
		  return IsValid;
		}
		
        plugin.validationStation = function(obj) {
			  var inputValid = true;
				/*******
				** 1. Required?
				*******/
			  if (obj.hasClass(plugin.settings.requiredClass) ){
					//reset
				  obj.removeClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.requiredClass)).slideUp('fast');
					//checkbox
				  if (obj.attr('type')==="checkbox") {
					if (!obj.is(":checked")){
					  inputValid = false;
					  obj.click(function(){
						 if (obj.is(":checked")){
								obj.removeClass(plugin.settings.errorClass);
								$('#'+obj.data(plugin.settings.requiredClass)).slideUp('fast');
						  }   
					  });
					  obj.addClass(plugin.settings.errorClass);
					  $('#'+obj.data(plugin.settings.requiredClass)).slideDown();  
					}
				  } else {
					  //text
					if ((obj.val() ==="" ) || (obj.val() == null)){
					  inputValid = false;
					  //check each keyup for valid input
					  if (obj.attr('type')==="text") {
					  obj.keyup(function(){
						  if ((obj.val() !="" ) && (obj.val() != null)){
								obj.removeClass(plugin.settings.errorClass);
								$('#'+obj.data(plugin.settings.requiredClass)).slideUp('fast');
						  }  
					  });
					  } else {
						  if (obj.is('select')){
								obj.change(function(){
								  if ((obj.val() !="" ) && (obj.val() != null)){
										obj.removeClass(plugin.settings.errorClass);
										$('#'+obj.data(plugin.settings.requiredClass)).slideUp('fast');
								  }  
							  });
						  }
					  }
					  //end keyup check
					  obj.addClass(plugin.settings.errorClass);
					  $('#'+obj.data(plugin.settings.requiredClass)).slideDown();
					}
				  }
			  }
			  
			  
				/*******
				** 2. Numsonly?
				*******/
			  if ((obj.hasClass(plugin.settings.numsOnlyClass) ) && (inputValid)){  //numbers only
				//reset
				obj.removeClass(plugin.settings.errorClass);
				$('#'+obj.data(plugin.settings.numsOnlyClass)).slideUp('fast');
				if (! /^[0-9]+$/.test(obj.val())){
				  inputValid = false;
				  obj.keyup(function(){
					  if (/^[0-9]+$/.test(obj.val())){
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.numsOnlyClass)).slideUp('fast');
					  }  
				  });
				  obj.addClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.numsOnlyClass)).slideDown();
				}
			  }
			  
				/*******
				** 3. Minimum val?  (int only)
				*******/
			  if (obj.hasClass(plugin.settings.minimumClass) && ( /^[0-9]+$/.test(obj.val()) ) ){ //min number
				obj.removeClass(plugin.settings.errorClass);
				$('#'+obj.data(plugin.settings.minimumClass)).slideUp('fast');
				if (obj.val() < obj.data( plugin.settings.minimumClass + '-value')){
				  inputValid = false;
					obj.keyup(function(){
					  if ( !obj.val() < obj.data( plugin.settings.minimumClass + '-value')){
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.minimumClass)).slideUp('fast');
					  }  
					});
				  obj.addClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.minimumClass)).slideDown();
				}
			  }
			  
				/*******
				** 4. Maximum val?  (int only)
				*******/
			  if (obj.hasClass(plugin.settings.maximumClass) && (/^[0-9]+$/.test(obj.val())) ){  //maximum number
				obj.removeClass(plugin.settings.errorClass);
				$('#'+obj.data(plugin.settings.maximumClass)).slideUp('fast');
				if (obj.val() > obj.data(plugin.settings.maximumClass + '-value')){
				  inputValid = false;
				  obj.keyup(function(){
					  if (! obj.val() > obj.data(plugin.settings.maximumClass + '-value')){
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.maximumClass)).slideUp('fast');
					  }  
					});
				  obj.addClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.maximumClass)).slideDown();
				}
			  }
			  
				/*******
				** 5. Email?
				*******/
			  //if ( (obj.hasClass(plugin.settings.emailClass)) && (!obj.hasClass(plugin.settings.errorClass)) ) {  //email
			   if (obj.hasClass(plugin.settings.emailClass)) {  //email
				obj.removeClass(plugin.settings.errorClass);
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!reg.test(obj.val())) {
				  inputValid = false;
				  obj.keyup(function(){
					  var emailTest = obj.val();
					  if(reg.test(emailTest)) {
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.emailClass)).slideUp('fast');
					  }  
					});
				  obj.addClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.emailClass)).slideDown();
				}
			  }
			
				/*******
				** 6. Required Only If Visible?
				*******/
			  if ( (obj.hasClass(plugin.settings.visibleReqClass)) && (obj.is(":visible"))) {   //required if visible
				  obj.removeClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.visibleReqClass)).slideUp('fast');
				  if ((obj.val() ==="" ) || (obj.val() == null)){
					inputValid = false;
					obj.keyup(function(){
					  if ((obj.val() !="" ) && (obj.val() != null)){
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.visibleReqClass)).slideUp('fast');
					  }  
					});
					obj.addClass(plugin.settings.errorClass);
					$('#'+obj.data(plugin.settings.visibleReqClass)).slideDown();
				  } 
			  }

			  /*******
				** 7. Exact Length Required?
				*******/
			  if (obj.hasClass(plugin.settings.exactlenClass))  {   //exact length required
				  obj.removeClass(plugin.settings.errorClass);
				  $('#'+obj.data(plugin.settings.exactlenClass)).slideUp('fast');
				  if (obj.val().length != obj.data(plugin.settings.exactlenClass + '-value') ){
					inputValid = false;
					obj.keyup(function(){
					  if (obj.val().length === obj.data(plugin.settings.exactlenClass + '-value') ){
						obj.removeClass(plugin.settings.errorClass);
						$('#'+obj.data(plugin.settings.exactlenClass)).slideUp('fast');
					  }  
					});
					obj.addClass(plugin.settings.errorClass);
					$('#'+obj.data(plugin.settings.exactlenClass)).slideDown();
				  } 
			  }

			  /*******
				** 8. Strict Match?
				*******/
			  if (obj.hasClass(plugin.settings.strictMatchClass))  {   //exact length required
				obj.removeClass(plugin.settings.errorClass);
				$('#'+obj.data(plugin.settings.strictMatchClass)).slideUp('fast');
				//split value on commas into array
				//loop array
				var arrayMatchStrings = obj.data(plugin.settings.strictMatchClass + '-value').split(',');
				var matched = false;
				
				for (strings in arrayMatchStrings){
					
				  	if (obj.val() === arrayMatchStrings[strings] ){
				  		
				  		matched = true;
				  	}
				} 


				if (!matched){
					inputValid = false;
					obj.keyup(function(){
						var matched = false;
						for (strings in arrayMatchStrings){
						  	if (obj.val() === arrayMatchStrings[strings] ){
						  		matched = true;
						  	}
						} 
						if (matched){
								obj.removeClass(plugin.settings.errorClass);
								$('#'+obj.data(plugin.settings.strictMatchClass)).slideUp('fast');
						}	 
					});
					obj.addClass(plugin.settings.errorClass);
					$('#'+obj.data(plugin.settings.strictMatchClass)).slideDown();
				}  
			}  
			return inputValid;
        }

        plugin.init();

    }

    $.fn.formValidate = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('formValidate')) {
                var plugin = new $.formValidate(this, options);
                $(this).data('formValidate', plugin);
            }
        });
    }

})(jQuery);