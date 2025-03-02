import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("cond", () => {
  it("evaluates a boolean expression and based on the result, returns one of the two specified return expressions", () => {
    expect(expry({ $cond: { if: true, then: "yes", else: "no" } })).toBe("yes");
    expect(expry({ $cond: { if: false, then: "yes", else: "no" } })).toBe("no");
  });
});

describe("ifNull", () => {
  it("returns the first non-null expression, or null if all expressions are null", () => {
    expect(expry({ $ifNull: [null, "hello", "bye"] })).toBe("hello");
    expect(expry({ $ifNull: [null, null, "bye"] })).toBe("bye");
    expect(expry({ $ifNull: [null, null, null] })).toBe(null);
  });
});

describe("switch", () => {
  it("evaluates a series of case expressions and returns the value of the first expression that evaluates to true, or the default value if there is no expression that evaluates to true", () => {
    expect(
      expry({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: true, then: 2 },
          ],
          default: 3,
        },
      })
    ).toBe(2);
    expect(
      expry({
        $switch: {
          branches: [
            { case: false, then: 1 },
            { case: false, then: 2 },
          ],
          default: 3,
        },
      })
    ).toBe(3);
  });
});
