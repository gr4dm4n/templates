////////////////////////////////////////////////////////////////////////////////
//
//  author:     Victor Chavarro
//  date:       04/09/14
//  intent:     Run MVC
//  requires:   angular.min.js
//
////////////////////////////////////////////////////////////////////////////////
(function() {
  
  /*Vacation app*/
  var vacationApp = angular.module('vacations', []);

  /* MVC> Inbox controller with dependency injection to get our inbox.json*/
  vacationApp.controller('GetInboxController', ['$http', function($http){
    
    var inboxData = this;
    inboxData.messages = [];

    $http.get('json/inbox.json').success(function(data){
      inboxData.messages = data
    });

  /**
   * Estimated elapsed days between two dates
   * @param {string} _startDate 
   * @param {string} _endDate
   * @return {int} totalDays
   */
    this.CalulateVacationDays = function( _startDate, _endDate )
    {
        var totalDays = 0;
        _startDate = Date.parse(_startDate);
        _endDate = Date.parse(_endDate);

        var totalTimeInMilliseconds = (_endDate - _startDate);

        if(totalTimeInMilliseconds > 0)
          totalDays = ( totalTimeInMilliseconds / 1000 ) / 86400
                
        return totalDays;
    };

  } ]);

  /*Directive> Load the html list of messages on inbox*/
  vacationApp.directive('inboxMessages',function(){
    return{
      restrict : 'E',
      templateUrl: 'templates/inbox-messages.html'
    };
  });

})();
