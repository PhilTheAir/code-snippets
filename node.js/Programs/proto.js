var robby = {};

var machine = 
{
	motors: 4,
	engine: ['v6']
};
robby.__proto__ = machine;
console.log(robby.motors);
robby.motors = 6;
console.log(robby.motors);
console.log(machine.motors);
// When changing an array or an object we make the change directly on the object
robby.engine.push('v8');
console.log(robby.engine);
console.log(machine.engine);

var vehicle = {};
robby.__proto__ = vehicle;
console.log('1st: ' + robby.friendly);
vehicle.friendly = 'nice';
console.log('2nd: ' + robby.friendly);

var car = Object.create(vehicle);
console.log(car.friendly);
var newCar = Object.create(vehicle, {years: {value: 3} });
console.log(newCar.years);
console.log(Object.getPrototypeOf(newCar));

var Robot = 
{
	new: function () 
	{
		return Object.create(this);
	}
};
// when Robot.new is called it should return a new object with the prototype set to Robot
var newRobot = Robot.new();
// Robot should be the prototype of newRobot
console.log(Robot === Object.getPrototypeOf(newRobot));

function Plane()
{
	this.wheel = 'round';
}
var newPlane = new Plane();
// the implicit 'this' above is only assigned to a new object when using 'new'. 
// If forgetting 'new' keyword then 'this' will be the global object.
console.log(newPlane instanceof Plane);
console.log(newPlane.wheel);

function Alien(name) 
{
	this.name = name;
}
// the function Alien has a prototype property
// we can add properties to this function prototype
Alien.prototype.kind = 'hehe'
// when we create a new object using new
var zippy = new Alien('Zippy');
// the __proto__ of the new object points to alien.prototype
console.log(zippy.__proto__ === Alien.prototype);
// in the new object we have access to properties defined in Alien.prototype
console.log(zippy.kind + ' ' + zippy.name);