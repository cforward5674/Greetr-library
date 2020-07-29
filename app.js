// gets a new object (set up so that don't have to use the 'new' keyword)
var g = G$("John", "Doe");

// use chainable methods
g.greet().setLang('es').greet(true).log();

// creates a function that hides the login div 
//when a language is selected and the button is clicked
$('#login').click(function() {
  
  var loginGrtr = G$('John', 'Doe');
  
  $('#logindiv').hide();
 
  // displays a greeting in the language that was selected
  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});