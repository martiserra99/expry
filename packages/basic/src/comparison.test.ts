import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("cmp", () => {
  it("compares two values and returns -1 if the first is less than the second, 1 if the first is greater than the second, and 0 if the two values are equal", () => {
    expect(expry({ $cmp: [3, 5] })).toBe(-1);
    expect(expry({ $cmp: [5, 3] })).toBe(1);
    expect(expry({ $cmp: [5, 5] })).toBe(0);
  });
});

describe("eq", () => {
  it("compares two values and returns true if they are equal", () => {
    expect(expry({ $eq: [3, 3] })).toBe(true);
    expect(expry({ $eq: ["hello", "bye"] })).toBe(false);
  });
});

describe("gt", () => {
  it("compares two values and returns true if the first is greater than the second", () => {
    expect(expry({ $gt: [5, 3] })).toBe(true);
    expect(expry({ $gt: [3, 5] })).toBe(false);
    expect(expry({ $gt: [3, 3] })).toBe(false);
  });
});

describe("gte", () => {
  it("compares two values and returns true if the first is greater than or equal to the second", () => {
    expect(expry({ $gte: [5, 3] })).toBe(true);
    expect(expry({ $gte: [3, 5] })).toBe(false);
    expect(expry({ $gte: [3, 3] })).toBe(true);
  });
});

describe("lt", () => {
  it("compares two values and returns true if the first is less than the second", () => {
    expect(expry({ $lt: [3, 5] })).toBe(true);
    expect(expry({ $lt: [5, 3] })).toBe(false);
    expect(expry({ $lt: [3, 3] })).toBe(false);
  });
});

describe("lte", () => {
  it("compares two values and returns true if the first is less than or equal to the second", () => {
    expect(expry({ $lte: [3, 5] })).toBe(true);
    expect(expry({ $lte: [5, 3] })).toBe(false);
    expect(expry({ $lte: [3, 3] })).toBe(true);
  });
});

describe("ne", () => {
  it("compares two values and returns true if they are not equal", () => {
    expect(expry({ $ne: [3, 3] })).toBe(false);
    expect(expry({ $ne: ["hello", "bye"] })).toBe(true);
  });
});
