import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import { basicOperations, BasicOperations } from "./index";

const expry = createExpry<[BasicOperations]>(basicOperations);

describe("and", () => {
  it("returns true if all expressions are true", () => {
    expect(expry({ $and: [true, true, true] })).toBe(true);
    expect(expry({ $and: [true, false, true] })).toBe(false);
  });
});

describe("not", () => {
  it("returns the opposite boolean value", () => {
    expect(expry({ $not: true })).toBe(false);
    expect(expry({ $not: false })).toBe(true);
  });
});

describe("or", () => {
  it("returns true if any of the expressions are true", () => {
    expect(expry({ $or: [true, false, true] })).toBe(true);
    expect(expry({ $or: [false, false, false] })).toBe(false);
  });
});
