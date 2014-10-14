
//CONTROLLERS
//
//MAIN CONTROLLER THAT ANGULAR INVOKES AND CONTAINES ALL CONTROLLERS

var MainController = function($scope)
{
	var personInformation = {
		firstName : 'Andrew',
		lastName : 'Perez',
		imageSrc: 'http://urlimage.com/1.jpg'
	};

	$scope.message = "hello";
	$scope.person = personInformation;
};


//llamado con $html
var PersonController = function($scope, $http)
{
	//una promesa es algo que sera llamado y promete que respondera,
	//así sea los datos que necesitaba o la respuesta de un error
	var promise = $http.get("/users/algo.json");

	//siempre devolver una promesa, la promesa entregara un valor en el futuro

	//cuando la promesa se cumpla
	promise.then(function(response){
		$scope.user = response.data;
	});
};

//https://api.github.com/users/gr4dm4n
//Lllamados http trabajando con promesas
var MainGitHubController = function($scope, $http){

	var OnUserComplete = function( response ){
		$scope.user = response.data
	};

	var OnError = function()
	{
		$scope.error = "Cant get the data";
	};

	$http.get("https://api.github.com/users/gr4dm4n")
		.then(OnUserComplete, OnError );
};




//MODULES
// controllers usualmente viven en modules 
//evitar el global namespace
// puedo varios modulos en mi aplicaciones
// varios controllers en mi modulo


var app = angular.module( "GitHubModule", [] );

//se pasa la funcion y los argumentos que recibe por array, porque a la hora de hacer minifaction
//se necesita que las variables minificadas sigan funcionando con $, todo esto cuando
//se pasa a producción
app.controller("MainGitHubController",["$scope", "$http", MainGitHubController]);


///FORMA CORRECTA

(function() {
	
	var app = angular.module("GitHubViwer",[]);

	app.controller("MainController", MainController);

}());























