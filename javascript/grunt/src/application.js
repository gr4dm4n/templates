var MyModule = (function(){

	function sayHi(name){
		return "hi "+name;
	}

	return{
		sayHi: sayHi
	};

}());
