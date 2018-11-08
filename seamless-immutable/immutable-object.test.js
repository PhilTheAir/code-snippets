const Immutable = require('seamless-immutable');

describe('overview', () => {

	function Square(length) {
		this.length = length
	};

	Square.prototype.area = function () {
		return Math.pow(this.length, 2)
	};

	// o will contain the key "length" and method `area()` returning 4
	let o = Immutable(new Square(2), { prototype: Square.prototype });

	it('is immutable', () => {
		expect(o.area()).toBe(4);
	});

});

describe('merge', () => {

	let o = Immutable({ status: "good", hypothesis: "plausible", errors: 0 });
	let p = o.merge({ status: "funky", hypothesis: "confirmed" })
	it('is immutable', () => {
		expect(o).toEqual(Immutable({ status: "good", hypothesis: "plausible", errors: 0 }));
		expect(p).toEqual(Immutable({ status: "funky", hypothesis: "confirmed", errors: 0 }));
	});

	let q = Immutable({ status: "bad", errors: 37 });
	let r = q.merge([{ status: "funky", errors: 1 }, { status: "groovy", errors: 2 }, { status: "sweet" }]);
	it('is immutable', () => {
		expect(r).toEqual(Immutable({ status: "sweet", errors: 2 }));
	});

});

describe('merge new property', () => {

	let o = Immutable({ status: "good", hypothesis: "plausible", errors: 0 });
	let p = o.merge({ statusNew: "funky", hypothesis: "confirmed" })
	it('is immutable', () => {
		expect(o).toEqual(Immutable({ status: "good", hypothesis: "plausible", errors: 0 }));
		expect(p).toEqual(Immutable({ status: "good", hypothesis: "confirmed", errors: 0, statusNew: "funky" }));
	});

});

describe('set', () => {

	let o = Immutable({ type: "parrot", subtype: "Norwegian Blue", status: "alive" });
	let p = o.set("status", "dead");

	it('is immutable', () => {
		expect(p).toEqual(Immutable({ type: "parrot", subtype: "Norwegian Blue", status: "dead" }));
	});

});

describe('set new property', () => {

	let o = Immutable({ type: "parrot", subtype: "Norwegian Blue", status: "alive" });
	let p = o.set("statusNew", "dead");

	it('is immutable', () => {
		expect(p).toEqual(Immutable({ type: "parrot", subtype: "Norwegian Blue", status: "alive", statusNew: "dead" }));
	});

});


describe('setIn', () => {

	let o = Immutable({ type: { main: "parrot", sub: "Norwegian Blue" }, status: "alive" });
	let p = o.setIn(["type", "sub"], "Norwegian Ridgeback")

	it('is immutable', () => {
		expect(p).toEqual(Immutable({ type: { main: "parrot", sub: "Norwegian Ridgeback" }, status: "alive" }));
	});

});

describe('update', () => {

	function inc(x) {
		return x + 1;
	}

	let i = Immutable({ foo: 1 });
	let j = i.update("foo", inc);

	it('is immutable', () => {
		expect(j).toEqual(Immutable({ foo: 2 }));
	});

	function add(x, y) {
		return x + y;
	}

	let k = i.update("foo", add, 10);
	it('is immutable', () => {
		expect(k).toEqual(Immutable({ foo: 11 }));
	});

});

describe('updateIn', () => {

	function add(x, y) {
		return x + y;
	}

	let i = Immutable({ foo: { bar: 1 } });
	let j = i.updateIn(["foo", "bar"], add, 10);

	it('is immutable', () => {
		expect(j).toEqual(Immutable({ foo: { bar: 11 } }));
	});

});

describe('without', () => {

	let i = Immutable({ the: "forests", will: "echo", with: "laughter" });
	let j = i.without("with");
	let k = i.without("will", "with");
	let r = i.without((value, key) => {
		return (key === "the" || value === "echo");
	});

	it('is immutable', () => {
		expect(j).toEqual(Immutable({ the: "forests", will: "echo" }));
		expect(k).toEqual(Immutable({ the: "forests" }));
		expect(r).toEqual(Immutable({ with: "laughter" }));
	});

});

describe('asMutable', () => {

	let i = Immutable({ when: "the", levee: "breaks" });
	let j = i.asMutable();
	j.have = "no place to go";

	it('is immutable', () => {
		expect(i).toEqual(Immutable({ when: "the", levee: "breaks" }));
		expect(j).toEqual({ when: "the", levee: "breaks", have: "no place to go" });
	});

});

describe('Pure javascript immutable Object', () => {

	let i = Immutable({
		hello: 'world',
	});

	// Has key OR Get key
	// i[key]
});