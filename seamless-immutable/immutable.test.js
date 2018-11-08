const Immutable = require('seamless-immutable');

describe('immutability', () => {

	const increment = (currentState) => {
		return currentState + 1;
	}

	it('is immutable', () => {
		let state = 42;
		let nextState = increment(state);

		expect(nextState).toBe(43);
		expect(state).toBe(42);
	});

});