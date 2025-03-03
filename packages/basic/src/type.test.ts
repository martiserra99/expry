import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import { basicOperations, BasicOperations } from "./index";

const expry = createExpry<[BasicOperations]>(basicOperations);

describe("isBoolean", () => {
  it("checks if a value is a boolean", () => {
    expect(expry({ $isBoolean: false })).toBe(true);
    expect(expry({ $isBoolean: 5 })).toBe(false);
    expect(expry({ $isBoolean: "hello" })).toBe(false);
  });
});

describe("isNumber", () => {
  it("checks if a value is a number", () => {
    expect(expry({ $isNumber: 5 })).toBe(true);
    expect(expry({ $isNumber: true })).toBe(false);
    expect(expry({ $isNumber: "hello" })).toBe(false);
  });
});

describe("isString", () => {
  it("checks if a value is a string", () => {
    expect(expry({ $isString: "hello" })).toBe(true);
    expect(expry({ $isString: 5 })).toBe(false);
    expect(expry({ $isString: true })).toBe(false);
  });
});

describe("toBoolean", () => {
  it("converts a value to a boolean", () => {
    expect(expry({ $toBoolean: "hello" })).toBe(true);
    expect(expry({ $toBoolean: "" })).toBe(false);
    expect(expry({ $toBoolean: 5 })).toBe(true);
    expect(expry({ $toBoolean: 0 })).toBe(false);
  });
});

describe("toNumber", () => {
  it("converts a value to a number", () => {
    expect(expry({ $toNumber: "5" })).toBe(5);
    expect(expry({ $toNumber: "hello" })).toBeNaN();
  });
});

describe("toString", () => {
  it("converts a value to a string", () => {
    expect(expry({ $toString: 5 })).toBe("5");
    expect(expry({ $toString: true })).toBe("true");
  });
});
