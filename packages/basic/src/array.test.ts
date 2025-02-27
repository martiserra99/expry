import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("arrayElemAt", () => {
  it("returns the element at the specified array index", () => {
    expect(expry({ $arrayElemAt: [[1, 2, 3], 0] })).toBe(1);
    expect(expry({ $arrayElemAt: [[1, 2, 3], 1] })).toBe(2);
    expect(expry({ $arrayElemAt: [[1, 2, 3], 3] })).toBe(null);
  });
});

describe("concatArrays", () => {
  it("concatenates arrays to return the concatenated array", () => {
    expect(expry({ $concatArrays: [["hello", " "], ["world"]] })).toEqual([
      "hello",
      " ",
      "world",
    ]);
    expect(expry({ $concatArrays: [["hello", " "], [["world"]]] })).toEqual([
      "hello",
      " ",
      ["world"],
    ]);
  });
});

describe("filter", () => {
  it("selects a subset of an array to return based on the specified condition", () => {
    expect(
      expry({
        $filter: {
          input: [1, 2, 3, 4],
          as: "num",
          cond: { $gt: ["$$num", 2] },
        },
      })
    ).toEqual([3, 4]);
  });
});

describe("firstN", () => {
  it("returns the first N elements of an array", () => {
    expect(expry({ $firstN: { n: 2, input: [1, 2, 3] } })).toEqual([1, 2]);
    expect(expry({ $firstN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(expry({ $firstN: { n: 2, input: [1] } })).toEqual([1]);
  });
});

describe("in", () => {
  it("returns a boolean indicating whether a specified value is in an array", () => {
    expect(expry({ $in: [2, [1, 2, 3]] })).toBe(true);
    expect(expry({ $in: ["abc", ["xyc", "abc"]] })).toBe(true);
    expect(expry({ $in: ["xy", ["xyc", "abc"]] })).toBe(false);
  });
});

describe("indexOfArray", () => {
  it("returns the index of the first occurrence of a specified value in an array", () => {
    expect(expry({ $indexOfArray: [["a", "abc"], "a"] })).toBe(0);
    expect(expry({ $indexOfArray: [[1, 2], 5] })).toBe(-1);
  });
});

describe("lastN", () => {
  it("returns the last N elements of an array", () => {
    expect(expry({ $lastN: { n: 2, input: [1, 2, 3] } })).toEqual([2, 3]);
    expect(expry({ $lastN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(expry({ $lastN: { n: 2, input: [1] } })).toEqual([1]);
  });
});

describe("map", () => {
  it("applies an expression to each element in an array and returns an array with the applied results", () => {
    expect(
      expry({
        $map: {
          input: [1, 2, 3],
          as: "num",
          in: { $add: ["$$num", 1] },
        },
      })
    ).toEqual([2, 3, 4]);
  });
  expect(
    expry({
      $map: {
        input: ["a", "b"],
        as: "str",
        in: { $toUpper: "$$str" },
      },
    })
  ).toEqual(["A", "B"]);
});

describe("maxN", () => {
  it("returns the N highest values in an array", () => {
    expect(expry({ $maxN: { n: 2, input: [3, 7, 2, 4] } })).toEqual([7, 4]);
    expect(expry({ $maxN: { n: 3, input: [3, 7, 2, 4] } })).toEqual([7, 4, 3]);
    expect(expry({ $maxN: { n: 5, input: [3, 7, 2, 4] } })).toEqual([
      7, 4, 3, 2,
    ]);
  });
});

describe("minN", () => {
  it("returns the N lowest values in an array", () => {
    expect(expry({ $minN: { n: 2, input: [3, 7, 2, 4] } })).toEqual([2, 3]);
    expect(expry({ $minN: { n: 3, input: [3, 7, 2, 4] } })).toEqual([2, 3, 4]);
    expect(expry({ $minN: { n: 5, input: [3, 7, 2, 4] } })).toEqual([
      2, 3, 4, 7,
    ]);
  });
});

describe("reduce", () => {
  it("applies an expression to each element in an array and combines them into a single value", () => {
    expect(
      expry({
        $reduce: {
          input: ["a", "b", "c"],
          initialValue: "",
          in: { $concat: ["$$value", "$$this"] },
        },
      })
    ).toBe("abc");
    expect(
      expry({
        $reduce: {
          input: [1, 2, 3],
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] },
        },
      })
    ).toBe(6);
  });
});

describe("reverseArray", () => {
  it("returns an array with the elements in reverse order", () => {
    expect(expry({ $reverseArray: [4, 2, 3] })).toEqual([3, 2, 4]);
    expect(expry({ $reverseArray: ["a", "c", "b"] })).toEqual(["b", "c", "a"]);
  });
});

describe("size", () => {
  it("returns the number of elements in an array", () => {
    expect(expry({ $size: [1, 2, 3] })).toBe(3);
    expect(expry({ $size: ["a", "b", "c", "d"] })).toBe(4);
    expect(expry({ $size: [] })).toBe(0);
  });
});

describe("slice", () => {
  it("returns a subset of an array", () => {
    expect(expry({ $slice: [[1, 2, 3], 1, 1] })).toEqual([2]);
    expect(expry({ $slice: [[1, 2, 3], 1, 2] })).toEqual([2, 3]);
    expect(expry({ $slice: [[1, 2, 3], 1, 3] })).toEqual([2, 3]);
    expect(expry({ $slice: [[1, 2, 3], 3, 2] })).toEqual([]);
  });
});

describe("sortArray", () => {
  it("returns an array with its elements sorted", () => {
    expect(
      expry({
        $sortArray: {
          input: [3, 4, 2],
          sortBy: { $cmp: ["$$first", "$$second"] },
        },
      })
    ).toEqual([2, 3, 4]);
    expect(
      expry({
        $sortArray: {
          input: [3, 4, 2],
          sortBy: { $cmp: ["$$second", "$$first"] },
        },
      })
    ).toEqual([4, 3, 2]);
  });
});
