const expect = require('unexpected');
const R = require('ramda');

describe("Vanilla", () => {
  it("should mutate", () => {
    const values = [9, 8, 7, 6];
    expect(values.sort(), 'to be', values);
  });
});

describe("Ramda", () => {
  it("should not mutate", () => {
    const values = [9, 8, 7, 6];
    expect(R.sort(values), 'not to be', values);
  });
});

