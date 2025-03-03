import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import { basicOperations, BasicOperations } from "./index";

const expry = createExpry<[BasicOperations]>(basicOperations);

describe("let", () => {
  it("creates variables that are used during the evaluation of an expression, and returns the expression's outcome", () => {
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
