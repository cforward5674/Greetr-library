;(function(global, $) {
// 'new' an object
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }
// hidden within th scope of the IIFE and never directly accessible
  var supportedLangs = ['en', 'es'];

  // informal greetings
  var greetings = {
      en: 'Hello',
      es: 'Hola'
  };

  // formal greetings
  var formalGreetings = {
      en: 'Greetings',
      es: 'Saludos'
  };

  // logger messages
  var logMessages = {
      en: 'Logged in',
      es: 'Inicio sesion'
  };

  // Prototype for Greetr w/additional objects
  Greetr.prototype = {
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    // language validation, if language isn't supported throws error
    validate: function() {
    if  (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    // informal greeting
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    // formal greeting
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
      var msg;

      // if undefinded or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting()
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    //if called this will log to the console the language used with the full name attached
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      return this;
    },

    // validates the language 
    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    // function that checks for jQuery library, if not throws an error, 
    // then uses jQuery to put a greeting on the screen from the Greetr library
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      var msg;
      if(formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    }
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function(firstName, lastName, language) {
    
    var self = this;
     self.firstName = firstName  || '';
     self.lastName = lastName || '';
     self.language = language || 'en';

     self.validate();
    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' for ease
    // similar to jQuery's '$'
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));

