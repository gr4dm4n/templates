////////////////////////////////////////////////////////////////////////////////
//
//  author:     Victor Chavarro
//  date:       04/09/14
//  intent:     Run the main jQuery scripts on the page
//  requires:   jquery.2.1.1.min.js
//
////////////////////////////////////////////////////////////////////////////////

  // IIFE - Immediately Invoked Function Expression
  (function(bizagi) {

      // The global jQuery object is passed as a parameter
      bizagi(window.jQuery, window, document);

      }(function($, window, document) {

          // The $ is now locally scoped 
          $(function() {

            // The DOM is ready

            /*DOM VARS*/
            var documentDOM = $(document);

            /*TRIGGERS*/

            //CLICK ON MESSAGES
            documentDOM.on("click",".message",function(){
            	$(this).find(".message-detail").slideToggle("fast");
            });

            /*Don't toggle if click on checkbox*/
            documentDOM.on("click",".from-user",function(event){
            	event.stopPropagation();
            });

          });

          //DOM IS LOADING
       

      }
  ));