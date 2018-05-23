import * as ctor from './class';
import * as gtor from './generics';

let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let sentence: string = `Hello, my age is ${decimal}.`

let list: number[] = [1, 2, 3];
let listGeneric: Array<number> = [1, 2, 3];

let x: [string, number];
x = ["hello", 10];

enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;
console.log(c);
// 2

let colorName: string = Color[2];
console.log(colorName);
// Green

enum Direction {
  Up = "UP1",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

console.log(Direction.Up, Direction[2], Direction["RIGHT"]);
// UP1 undefined undefined

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

for (var i = 0; i < 10; i++) {
  setTimeout(function () { console.log(i); }, 100 * i);
}

for (let i = 0; i < 10; i++) {
  setTimeout(function () { console.log(i); }, 100 * i);
}

interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

interface Point {
  readonly x: number;
  readonly y: number;
}
// Variables use const whereas properties use readonly

let p1: Point = { x: 10, y: 20 };

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// function type
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

// indexable types
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
  console.log(pet); // "species"
}

for (let pet of pets) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}

let sym1 = Symbol();

let sym2 = Symbol("key"); // optional string key
// Symbols are immutable, and unique.

let sym3 = Symbol("key");

console.log(sym2 === sym3); // false, symbols are unique

let obj = {
  [sym1]: "value"
};

console.log(obj[sym1]); // "value"

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//   select() { }
// }

