import { expry } from '../../src';

describe('$and', () => {
  it('evaluates one or more expressions and returns true if any of the expressions are true', () => {
    expect(expry({ $and: [true, true] })).toBe(true);
    expect(expry({ $and: [true, false, true] })).toBe(false);
  });
});

describe('$not', () => {
  it('evaluates a boolean and returns the opposite boolean value', () => {
    expect(expry({ $not: true })).toBe(false);
    expect(expry({ $not: false })).toBe(true);
  });
});

describe('$or', () => {
  it('evaluates one or more expressions and returns true if any of the expressions are true', () => {
    expect(expry({ $or: [true, false] })).toBe(true);
    expect(expry({ $or: [false, false] })).toBe(false);
  });
});
