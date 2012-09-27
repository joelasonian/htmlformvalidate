HTML Form Validate Plugin for jQuery
====================================

The HTML Form Validate Plugin for jQuery performs a client side validation of a form based on parameters defined in the HTML allowing for complete validation configuration outside of JavaScript.

Basic Usage
-----------
* Include the formvalidate.jquery.js plugin, along with jQuery and the formvalidate.css
* Add class to the input corresponding to the type of desired validation
* Add a data-[[classname]] attribute where [[classname]] = the validation class.  The value of this attribute is set to the ID of the error message pane that will display when this validation fails.
* Invoke the plugin on document ready

	$(document).ready(function() {
		$('.validate').formValidate();
	});


Sample for Required Field
-------------------------

	<input type="text" name="name" value="" class="valrequired" data-valrequired="nameErr" />
	<div id="nameErr" class="hidden errorpane">Name is required</div>


Default Classes
------------------
* valrequired  -  Input required
* valstrictmatch   -  Must match value exactly
** requires additional parameter 'data-valstrictmatch-value' with the stictmactch value  (can comma deliminate for multiple values) 
* valnumsonly  -  Numbers only
* valemail  -  Valid Email
* valifvisible  -  Required only if visible
* valmin - minimum number value
** requires additional parameter 'data-valmin-value' with the value of minimium value
* valmax - maximum number value
** requires additional parameter 'data-valmax-value' with the value of maximumvalue
* valexactlen - exact length of an input
** requires additional parameter 'data-valexactlen-value' with the value of valexactlen
* valphone - Matches characters commonly used in phone numbers (numbers, '(',')',' ','.','-')


Additional Checks (edge case)
-----------------------------
* Minimum value
* Maximum value
* Required only if Visible
* Exact length

Advanced Usage
--------------
* Overwritting classnames
* AJAX Form Posts
* Invalid Callback Function
* Valid Callback Function