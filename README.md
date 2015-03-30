# handleParams
A jQuery plugin to easy parse url parameters and return their values

## How To Use:
Make sure to include jQuery in your page
```
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
```
Include *handleParams"
```
<script src="js/handleParams.js"></script>
```
Initialize the plugin.  For example:
```
var params = $(window).handleParams();
```
To check if a url has parameters: 
```
params.hasParameter();  //Returns true if there is a parameter, false if there is not
```
To return the value of a parameter
```
params.getParameter('page');
```
To parse parameters, with options set:
```
var params = $(window).handleParams({
  // what to do if there are no parameters
	noParamHandler: function() {
		$('#myform')[0].reset();
		$('#page-number').val(1);
	},
	//parameters to parse
	params: ["page"],
	//what to do with each individual parameter
	handleIndivParam: function(index, paramName, paramValue) {
	  if (paramName === "page") {
	    $('#page-number').val(paramValue);
	  }
	}
});

params.parseParams();
```
