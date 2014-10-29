class List {

	private elements: any[]
	
	addElemente(elem: any): void
	getElement(position: number): any

}

//GENERICS
class List<T>
{

	private elements: T[]
	
	addElement( elem : T): void
	getElement(position: number) : T
}


var clientList: List<Client>;
var clientList: List<Products>