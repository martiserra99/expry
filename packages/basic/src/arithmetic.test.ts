import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import { basicOperations, BasicOperations } from "./index";

const expry = createExpry<[BasicOperations]>(basicOperations);

describe("abs", () => {
  it("returns the absolute value of a number", () => {
    expect(expry({ $abs: -5 })).toBe(5);
    expect(expry({ $abs: 5 })).toBe(5);
  });
});

describe("add", () => {
  it("adds numbers together", () => {
    expect(expry({ $add: [1, 2, 3] })).toBe(6);
    expect(expry({ $add: [-1, 2, -3, 4] })).toBe(2);
  });
});

describe("ceil", () => {
  it("returns the smallest integer greater than or equal to the specified number", () => {
    expect(expry({ $ceil: 5.5 })).toBe(6);
    expect(expry({ $ceil: 5.1 })).toBe(6);
    expect(expry({ $ceil: -2.8 })).toBe(-2);
  });
});

describe("divide", () => {
  it("divides one number by another", () => {
    expect(expry({ $divide: [10, 2] })).toBe(5);
    expect(expry({ $divide: [5, 2] })).toBe(2.5);
  });
});

describe("floor", () => {
  it("returns the largest integer less than or equal to the specified number", () => {
    expect(expry({ $floor: 5.5 })).toBe(5);
    expect(expry({ $floor: 5.1 })).toBe(5);
    expect(expry({ $floor: -2.8 })).toBe(-3);
  });
});

describe("mod", () => {
  it("divides one number by another and returns the remainder", () => {
    expect(expry({ $mod: [10, 3] })).toBe(1);
    expect(expry({ $mod: [10, 2] })).toBe(0);
  });
});

describe("multiply", () => {
  it("multiplies numbers together", () => {
    expect(expry({ $multiply: [1, 2, 3] })).toBe(6);
    expect(expry({ $multiply: [-1, 2, -3, 4] })).toBe(24);
  });
});

describe("pow", () => {
  it("raises a number to the specified exponent", () => {
    expect(expry({ $pow: [2, 3] })).toBe(8);
    expect(expry({ $pow: [3, 2] })).toBe(9);
    expect(expry({ $pow: [9, 0.5] })).toBe(3);
  });
});

describe("round", () => {
  it("rounds a number to a specified decimal place", () => {
    expect(expry({ $round: [5.4, 0] })).toBe(5);
    expect(expry({ $round: [5.55, 1] })).toBe(5.6);
    expect(expry({ $round: [5.55, 3] })).toBe(5.55);
  });
});

describe("subtract", () => {
  it("subtracts one number from another", () => {
    expect(expry({ $subtract: [5, 3] })).toBe(2);
    expect(expry({ $subtract: [3, 5] })).toBe(-2);
  });
});

describe("trunc", () => {
  it("truncates a number to the specified number of decimal places", () => {
    expect(expry({ $trunc: [5.55, 0] })).toBe(5);
    expect(expry({ $trunc: [5.55, 1] })).toBe(5.5);
    expect(expry({ $trunc: [5.55, 3] })).toBe(5.55);
  });
});
