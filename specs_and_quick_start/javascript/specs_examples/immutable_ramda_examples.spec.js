const expect = require('unexpected');
const I = require('../ramda-immutable-wrapper');
const { Map } = require('immutable');

describe("Immutable (integrated with Ramda)", () => {
  it("should create a new obj with different values", () => {
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = I.set('b', 50, map1);
    expect(I.get('b', map1), "to equal", 2);
    expect(I.get('b', map2), "to equal", 50);
  });
});