var util = requiere("../src/unit");

exports.testH1 = function(test){
	test.equal(util.h1("hi"), "hi hi", "string should be equal");
}