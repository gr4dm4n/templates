/* VIANCH GRUNT CONCAT TEST */
var MyModule = (function(){

	function sayHi(name){
		return "hi "+name;
	}

	return{
		sayHi: sayHi
	};

}());


function hi(text){
	return "hi"+text;
}

hi("Victor");