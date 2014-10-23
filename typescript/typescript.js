var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Engine = (function () {
    function Engine(horsePower, engineType) {
        this.horsePower = horsePower;
        this.engineType = engineType;
    }
    return Engine;
})();
var Car = (function () {
    function Car(engine) {
        this.setEngine(engine);
    }
    Car.prototype.getEngine = function () {
        return this._engine;
    };
    Car.prototype.setEngine = function (value) {
        if (value === undefined)
            throw 'need supply an engine!';
        else
            this._engine = value;
    };
    Car.prototype.start = function () {
        return 'Started' + this._engine.engineType;
    };
    Car.prototype.stop = function () {
        return 'Stopped' + this._engine.engineType;
    };
    return Car;
})();
window.onload = function () {
    var engine = new Engine(300, 'V8');
    var car = new Car(engine);
    var startCart = car.start();
    alert(startCart);
};
var Auto = (function () {
    function Auto(engine) {
        this.engine = engine;
    }
    return Auto;
})();
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(engine, fourByFour) {
        _super.call(this, engine);
        this.fourByFour = fourByFour;
    }
    return Truck;
})(Auto);
var EngineMachine = (function () {
    function EngineMachine(horsePower, engineType) {
        this.horsePower = horsePower;
        this.engineType = engineType;
    }
    EngineMachine.prototype.start = function (callback) {
        var _this = this;
        window.setTimeout(function () {
            callback(true, _this.engineType);
        }, 1000);
    };
    EngineMachine.prototype.stop = function (callback) {
        var _this = this;
        window.setTimeout(function () {
            callback(true, _this.engineType);
        }, 1000);
    };
    return EngineMachine;
})();
//# sourceMappingURL=typescript.js.map