const expect = require('unexpected');
const { Map } = require('immutable');

describe("Immutable", () => {
  it("should create a new obj with different values", () => {
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);
    expect(map1.get('b'), "to equal", 2);
    expect(map2.get('b'), "to equal", 50);
  });
});