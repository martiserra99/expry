import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("let", () => {
  it("binds variables for use in the specified expression, and returns the result of the expression", () => {
    expect(
      expry({
        $let: {
          vars: { age: 24 },
          in: { isAdult: { $gte: ["$$age", 18] } },
        },
      })
    ).toEqual({ isAdult: true });
  });
});
