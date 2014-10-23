/*
* Typescript template
*
* Documentation
* http://www.typescriptlang.org/
*
* Depends:
* node.js
* npm install -g typescript
*/

class Engine{
	constructor(
		public horsePower: number,
		public engineType: string
	){}
}


/*Only works on compilations ES5*/
/*class Car{
	//FIELDS
	private _engine: Engine;

	//CONSTRUCTOR
	constructor(engine: Engine){
		this.engine = engine;
	}

	//PROPERTIES
	get engine(): Engine{
		return this._engine
	}

	set engine(value: Engine){
		if(value === undefined)
			throw 'need supply an engine!';
		else
			this._engine = value;
	}

	//FUNCTIONS
	start(){
		return 'Started' + this._engine.engineType;
	}

	stop(){
		return 'Stopped' + this._engine.engineType;
	}
}*/

/*Works in all browers and compilations ES3*/
class Car{
	//FIELDS
	private _engine: Engine;

	//CONSTRUCTOR
	constructor(engine: Engine){
		this.setEngine(engine);
	}

	//PROPERTIES
	getEngine(): Engine{
		return this._engine
	}

	setEngine(value: Engine){
		if(value === undefined)
			throw 'need supply an engine!';
		else
			this._engine = value;
	}

	//FUNCTIONS
	start(){
		return 'Started' + this._engine.engineType;
	}

	stop(){
		return 'Stopped' + this._engine.engineType;
	}
}


window.onload = function(){
	var engine = new Engine(300, 'V8');
	var car = new Car(engine);

	var startCart = car.start();
	alert(startCart);
}



/*SAME FUNCTION BUT SIMPLIFIED*/
/*class car{
	constructor(public engine: string){}
}*/


/*TYPE EXTENSION EXAMPLE*/

class Auto
{
	engine: Engine;
	constructor(engine: Engine){
		this.engine = engine;
	}
}

class Truck extends Auto{
	fourByFour: boolean;
	constructor(engine: Engine, fourByFour: boolean){
		super(engine); //call the parent constructor

		this.fourByFour = fourByFour;
	}
}


/**
* INTERFACES
* Example: Simulate buttons of a Engine machine
* the buttons are start and stop, but the buttons
* exist en differents machines.
**/

// The contract in this cas is the interface that object must implement

interface IEngine{
	start(
		callback: ( startStatus: boolean, engineType: string ) => void
	): void;

	stop(
		callback: ( stopStatus: boolean, engineType: string ) => void
	);
}

// Another interface : Machine

interface IMachine{
	engine: IEngine;
	basePrice: number;
	state: string;
	make?: string;
	model?: string;
	year?: number;
}

//IMPLEMANTATION OF THE INTERFACES

class EngineMachine implements IEngine{
	constructor(public horsePower: Number, 
				public engineType: string){}

	start(callback: ( startStatus: boolean, engineType: string) => void){
		window.setTimeout(()=>{
			callback(true,this.engineType);
		},1000);
	}

	stop(callback: (stopStatus: boolean, engineType: string) => void){
		window.setTimeout(() => {
			callback(true, this.engineType);
		},1000);
	}
}










