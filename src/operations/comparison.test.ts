import { describe, it, expect } from "vitest";

import { expry } from "../";

describe("$cmp", () => {
  it("compares two values and returns -1, 1 or 0", () => {
    expect(expry({ $cmp: [3, 5] })).toBe(-1);
    expect(expry({ $cmp: [5, 3] })).toBe(1);
    expect(expry({ $cmp: [5, 5] })).toBe(0);
  });
});

describe("$eq", () => {
  it("compares two values and returns true if they are equal", () => {
    expect(expry({ $eq: [5, 5] })).toBe(true);
    expect(expry({ $eq: ["hello", "bye"] })).toBe(false);
  });
});

describe("$gt", () => {
  it("compares two values and returns true if the first is greater than the second", () => {
    expect(expry({ $gt: [5, 2] })).toBe(true);
    expect(expry({ $gt: [5, 7] })).toBe(false);
  });
});

describe("$gte", () => {
  it("compares two values and returns true if the first is greater than or equal to the second", () => {
    expect(expry({ $gte: [5, 2] })).toBe(true);
    expect(expry({ $gte: [5, 5] })).toBe(true);
    expect(expry({ $gte: [5, 7] })).toBe(false);
  });
});

describe("$lt", () => {
  it("compares two values and returns true if the first is less than the second", () => {
    expect(expry({ $lt: [5, 7] })).toBe(true);
    expect(expry({ $lt: [5, 2] })).toBe(false);
  });
});

describe("$lte", () => {
  it("compares two values and returns true if the first is less than or equal to the second", () => {
    expect(expry({ $lte: [5, 7] })).toBe(true);
    expect(expry({ $lte: [5, 5] })).toBe(true);
    expect(expry({ $lte: [5, 2] })).toBe(false);
  });
});

describe("$ne", () => {
  it("compares two values and returns true if they are not equal", () => {
    expect(expry({ $ne: ["hello", "bye"] })).toBe(true);
    expect(expry({ $ne: [5, 5] })).toBe(false);
  });
});
