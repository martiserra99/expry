import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("getField", () => {
  it("gets the value of a field in an object", () => {
    expect(
      expry({
        $getField: {
          field: "qty",
          input: { item: "apple", qty: 25, price: 4.5 },
        },
      })
    ).toEqual(25);
  });
});

describe("mergeObjects", () => {
  it("merges objects into a single object", () => {
    expect(
      expry({
        $mergeObjects: [
          { item: "apple", qty: 5, price: 2.5 },
          { qty: 10, price: 1.2, sale: true },
        ],
      })
    ).toEqual({
      item: "apple",
      qty: 10,
      price: 1.2,
      sale: true,
    });
  });
});

describe("setField", () => {
  it("sets a field in an object to a specified value", () => {
    expect(
      expry({
        $setField: {
          field: "item",
          input: { qty: 25, price: 4.5 },
          value: "apple",
        },
      })
    ).toEqual({
      item: "apple",
      qty: 25,
      price: 4.5,
    });
  });
});
