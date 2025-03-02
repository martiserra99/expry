import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("getValue", () => {
  it("gets the value of a property in an object", () => {
    expect(
      expry({
        $getValue: {
          input: { item: "apple", qty: 25, price: 4.5 },
          key: "qty",
        },
      })
    ).toBe(25);
    expect(
      expry({
        $getValue: {
          input: { item: "apple", price: 4.5 },
          key: "qty",
        },
      })
    ).toBe(undefined);
  });
});

describe("mergeObjects", () => {
  it("merges objects into a single object", () => {
    expect(
      expry({
        $mergeObjects: [{ item: "apple" }, { qty: 25, price: 4.5 }],
      })
    ).toEqual({ item: "apple", qty: 25, price: 4.5 });
    expect(
      expry({
        $mergeObjects: [
          { item: "apple", qty: 10 },
          { qty: 25 },
          { price: 4.5 },
        ],
      })
    ).toEqual({ item: "apple", qty: 25, price: 4.5 });
  });
});

describe("objectToArray", () => {
  it("converts an object to an array of key-value pairs", () => {
    expect(
      expry({
        $objectToArray: { item: "apple", qty: 25, price: 4.5 },
      })
    ).toEqual([
      ["item", "apple"],
      ["qty", 25],
      ["price", 4.5],
    ]);
    expect(
      expry({
        $objectToArray: { item: "apple", price: 4.5 },
      })
    ).toEqual([
      ["item", "apple"],
      ["price", 4.5],
    ]);
  });
});

describe("setValue", () => {
  it("sets the value of a property in an object", () => {
    expect(
      expry({
        $setValue: {
          input: { item: "apple", qty: 25, price: 4.5 },
          key: "qty",
          value: 30,
        },
      })
    ).toEqual({ item: "apple", qty: 30, price: 4.5 });
    expect(
      expry({
        $setValue: {
          input: { item: "apple", price: 4.5 },
          key: "qty",
          value: 30,
        },
      })
    ).toEqual({ item: "apple", qty: 30, price: 4.5 });
  });
});
