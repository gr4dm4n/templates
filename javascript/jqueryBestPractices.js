////////////////////////////////////////////////////////////////////////////////
//
//  src:        www.irisdesarrollo.co
//  author:     Victor Chavarro
//  date:       14/08/14
//  intent:     Run the main scripts on the page
//  requires:   jquery.1.11.1.min.js
//              angular.min.js
//
////////////////////////////////////////////////////////////////////////////////

/*
* jQuery UI Effects Bounce @VERSION
*
* Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Effects/Bounce
*
* Depends:
* jquery.effects.core.js
*/



  // IIFE - Immediately Invoked Function Expression
  (function(audio) {

      // The global jQuery object is passed as a parameter
      audio(window.jQuery, window, document);

      }(function($, window, document) {

          // The $ is now locally scoped 
          $(function() {

              // The DOM is ready
              loadVIdeoplayer();


          });

          // The rest of your code goes here!

          function loadVIdeoplayer()
          {

          }

      }
  ));

  // Atributes
  // Stores the live DOM element inside of a variable
  var elem = $("#elem");

  // Chaining
  elem.attr("title", elem.text()).css("color", "red").fadeOut();



  //events
  var list = $("#longlist");

  list.on("mouseenter", "li", function(){

    $(this).text("Click me!");

  });

  list.on("click", "li", function() {

    $(this).text("Why did you click me?!");

  });
  
  	  
  //ajax
  function getName(personid) {
    var dynamicData = {};
    dynamicData["id"] = personID;
    return $.ajax({
      url: "getName.php",
      type: "get",
      data: dynamicData
    });
  }

  getName("2342342").done(function(data) {
    // Updates the UI based the ajax result
    $(".person-name").text(data.name); 
  });
  
  
  //ajax otra forma
  
var request = $.ajax({
	url: "script.php",
	type: "POST",
	data: { id : menuId },
	dataType: "html"
});
request.done(function( msg ) {
	$( "#log" ).html( msg );
	c
});
request.fail(function( jqXHR, textStatus ) {
	alert( "Request failed: " + textStatus );
});
  
  
  
  /*PROTOTYPE*/
  
  //ALL IN ONE
  var RestaurantMaker = function () {
  var myPrivateVar;

  var private_stuff = function() {
    return "I can set this here!";
  };

  function use_restroom() {
    private_stuff();
  }

  function buy_food() {
    return private_stuff();
  }

  return {
    use_restroom: use_restroom,
    buy_food: buy_food
  };
};


/*all separated*/

function Person(name,family)
{
    this.name = name;
    this.family = family;
}

Person.prototype.getFull = function()
{
    return this.name+" "+this.family; 
}

/*separated 2*/

function Person(name,family)
{
    this.name = name;
    this.family = family;
    
    var records = [{type:"in",amount:0}];

    this.addTransaction = function(trans)
    {
    	if(trans.hasOwnProperty("type") && trans.hasOwnProperty("amount"))
    	   records.push(trans);
    }

    this.balance = function()
    {
       var total = 0;

       records.forEach(function(record)
       {
	   if(record.type === "in")
	     total += record.amount;
           else
	     total -= record.amount;
	});
	
        return total;
    };
};

Person.prototype.getFull = function()
{
    return this.name+" "+this.family;
};

Person.prototype.getProfile = function()
{
     return this.getFull()+", total balance: "+this.balance();
};


/****************** CALLBACKS ***************/
function myFunction(arg1, arg2, callback){
    // do something

    typeof callback == "function" && callback();
}


/******AUXILIARS *****/


                /**
                * Print Alerts on screen
                * @param {string} _msg 
                * @param {bool} _isError
                */
                function Alert( _msg, _isError )
                {
                  alert(_msg)
                }




//JAVASCRIPT PARTTERs


//FUNCTIONS AS ABSTRACTIONS
var Work = function()
{
  console.log("wordking hard");
};


var DoWork = function( _function )
{

  console.log("starts");

  try{
    _function();  
  }
  catch(e){
    console.log(e);
  }
  
  console.log("ends");
};


DoWork(Work);

// IIFE - Inmmediately Invoked Function Expression
(function()
{
  //MODULES
  var CreateWorker = function()
  {
    var workCount = 0;

    var Task1 = function()
    {
      workCount +=1;
      console.log("task1 " + workCount);
    };

    var Task2 = function()
    ingenie{
      workCount +=1;
      console.log("task2 " + workCount);
    };

    //revealing module pattern (patrón modulo revelador)
    return {
      Job1: Task1,
      Job2: Task2
    };
  };


  var workerOBJ = CreateWorker();


  workerOBJ.Job1();
  workerOBJ.Job2();
}());
