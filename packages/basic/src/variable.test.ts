import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

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
