import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import { basicOperations, BasicOperations } from "./index";

const expry = createExpry<[BasicOperations]>(basicOperations);

describe("arrayElemAt", () => {
  it("returns the element at the specified index in an array", () => {
    expect(expry({ $arrayElemAt: [[1, 2, 3], 0] })).toBe(1);
    expect(expry({ $arrayElemAt: [[1, 2, 3], 1] })).toBe(2);
    expect(expry({ $arrayElemAt: [[1, 2, 3], 3] })).toBe(undefined);
  });
});

describe("arrayToObject", () => {
  it("converts an array of two-element arrays into an object", () => {
    expect(
      expry({
        $arrayToObject: [
          ["a", 1],
          ["b", 2],
        ],
      })
    ).toEqual({ a: 1, b: 2 });
    expect(
      expry({
        $arrayToObject: [
          ["name", "John"],
          ["age", 30],
        ],
      })
    ).toEqual({ name: "John", age: 30 });
    expect(
      expry({
        $arrayToObject: [
          ["a", 1],
          ["b", 2],
          ["a", 3],
        ],
      })
    ).toEqual({ a: 3, b: 2 });
  });
});

describe("concatArrays", () => {
  it("returns the concatenation of arrays", () => {
    expect(
      expry({
        $concatArrays: [
          [1, 2],
          [3, 4],
        ],
      })
    ).toEqual([1, 2, 3, 4]);
    expect(
      expry({
        $concatArrays: [["hello", " "], ["world"]],
      })
    ).toEqual(["hello", " ", "world"]);
    expect(
      expry({
        $concatArrays: [["hello", " "], [["world"]]],
      })
    ).toEqual(["hello", " ", ["world"]]);
  });
});

describe("every", () => {
  it("returns true if all elements in an array satisfy the specified condition", () => {
    expect(
      expry({
        $every: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 0] } },
      })
    ).toBe(true);
    expect(
      expry({
        $every: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 1] } },
      })
    ).toBe(false);
  });
});

describe("filter", () => {
  it("returns a subset of an array based on the specified condition", () => {
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

describe("find", () => {
  it("returns the first element in an array that satisfies the specified condition", () => {
    expect(
      expry({
        $find: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 1] } },
      })
    ).toBe(2);
    expect(
      expry({
        $find: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 3] } },
      })
    ).toBe(undefined);
  });
});

describe("findIndex", () => {
  it("returns the index of the first element in an array that satisfies the specified condition", () => {
    expect(
      expry({
        $findIndex: {
          input: [1, 2, 3],
          as: "num",
          cond: { $gt: ["$$num", 1] },
        },
      })
    ).toBe(1);
    expect(
      expry({
        $findIndex: {
          input: [1, 2, 3],
          as: "num",
          cond: { $gt: ["$$num", 3] },
        },
      })
    ).toBe(-1);
  });
});

describe("first", () => {
  it("returns the first element of an array", () => {
    expect(expry({ $first: [1, 2, 3] })).toBe(1);
    expect(expry({ $first: ["a", "b", "c"] })).toBe("a");
    expect(expry({ $first: [] })).toBe(undefined);
  });
});

describe("firstN", () => {
  it("returns the first N elements of an array", () => {
    expect(expry({ $firstN: { n: 2, input: [1, 2, 3] } })).toEqual([1, 2]);
    expect(expry({ $firstN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(expry({ $firstN: { n: -1, input: [1, 2] } })).toEqual([]);
  });
});

describe("in", () => {
  it("returns a boolean indicating whether a value is in an array", () => {
    expect(expry({ $in: [2, [1, 2, 3]] })).toBe(true);
    expect(expry({ $in: [4, [1, 2, 3]] })).toBe(false);
    expect(expry({ $in: ["world", ["hello", "world"]] })).toBe(true);
  });
});

describe("indexOfArray", () => {
  it("returns the index of the first occurrence of a specified value in an array", () => {
    expect(expry({ $indexOfArray: [["a", "abc"], "a"] })).toBe(0);
    expect(expry({ $indexOfArray: [[1, 2], 5] })).toBe(-1);
  });
});

describe("last", () => {
  it("returns the last element of an array", () => {
    expect(expry({ $last: [1, 2, 3] })).toBe(3);
    expect(expry({ $last: ["a", "b", "c"] })).toBe("c");
    expect(expry({ $last: [] })).toBe(undefined);
  });
});

describe("lastN", () => {
  it("returns the last N elements of an array", () => {
    expect(expry({ $lastN: { n: 2, input: [1, 2, 3] } })).toEqual([2, 3]);
    expect(expry({ $lastN: { n: 3, input: [1, 2] } })).toEqual([1, 2]);
    expect(expry({ $lastN: { n: -1, input: [1, 2] } })).toEqual([]);
  });
});

describe("length", () => {
  it("returns the number of elements in an array", () => {
    expect(expry({ $length: [1, 2, 3] })).toBe(3);
    expect(expry({ $length: ["a", "b", "c", "d"] })).toBe(4);
    expect(expry({ $length: [] })).toBe(0);
  });
});

describe("map", () => {
  it("applies an expression to each element in an array", () => {
    expect(
      expry({
        $map: {
          input: [1, 2, 3],
          as: "num",
          in: { $add: ["$$num", 1] },
        },
      })
    ).toEqual([2, 3, 4]);
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
});

describe("max", () => {
  it("returns the largest value in an array", () => {
    expect(expry({ $max: [3, 7, 2, 4] })).toBe(7);
    expect(expry({ $max: ["a", "c", "b"] })).toBe("c");
    expect(expry({ $max: [] })).toBe(undefined);
  });
});

describe("maxN", () => {
  it("returns the N largest values in an array", () => {
    expect(
      expry({
        $maxN: { n: 2, input: [3, 7, 2, 4] },
      })
    ).toEqual([7, 4]);
    expect(
      expry({
        $maxN: { n: 3, input: [3, 7, 2, 4] },
      })
    ).toEqual([7, 4, 3]);
    expect(
      expry({
        $maxN: { n: 5, input: [3, 7, 2, 4] },
      })
    ).toEqual([7, 4, 3, 2]);
  });
});

describe("min", () => {
  it("returns the smallest value in an array", () => {
    expect(expry({ $min: [3, 7, 2, 4] })).toBe(2);
    expect(expry({ $min: ["a", "c", "b"] })).toBe("a");
    expect(expry({ $min: [] })).toBe(undefined);
  });
});

describe("minN", () => {
  it("returns the N smallest values in an array", () => {
    expect(
      expry({
        $minN: { n: 2, input: [3, 7, 2, 4] },
      })
    ).toEqual([2, 3]);
    expect(
      expry({
        $minN: { n: 3, input: [3, 7, 2, 4] },
      })
    ).toEqual([2, 3, 4]);
    expect(
      expry({
        $minN: { n: 5, input: [3, 7, 2, 4] },
      })
    ).toEqual([2, 3, 4, 7]);
  });
});

describe("objectToArray", () => {
  it("converts an object to an array of key-value pairs", () => {
    expect(
      expry({
        $objectToArray: { a: 1, b: 2 },
      })
    ).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
    expect(
      expry({
        $objectToArray: { name: "John", age: 30 },
      })
    ).toEqual([
      ["name", "John"],
      ["age", 30],
    ]);
  });
});

describe("pop", () => {
  it("removes the last element from an array and returns the array", () => {
    expect(expry({ $pop: [1, 2, 3] })).toEqual([1, 2]);
    expect(expry({ $pop: ["a", "b", "c"] })).toEqual(["a", "b"]);
    expect(expry({ $pop: [] })).toEqual([]);
  });
});

describe("push", () => {
  it("adds an element to the end of an array and returns the array", () => {
    expect(expry({ $push: [[1, 2], 3] })).toEqual([1, 2, 3]);
    expect(expry({ $push: [["a", "b"], "c"] })).toEqual(["a", "b", "c"]);
    expect(expry({ $push: [[], "a"] })).toEqual(["a"]);
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
  it("reverses the elements of an array", () => {
    expect(expry({ $reverseArray: [4, 2, 3] })).toEqual([3, 2, 4]);
    expect(expry({ $reverseArray: ["a", "c", "b"] })).toEqual(["b", "c", "a"]);
  });
});

describe("shift", () => {
  it("removes the first element from an array and returns the array", () => {
    expect(expry({ $shift: [1, 2, 3] })).toEqual([2, 3]);
    expect(expry({ $shift: ["a", "b", "c"] })).toEqual(["b", "c"]);
    expect(expry({ $shift: [] })).toEqual([]);
  });
});

describe("slice", () => {
  it("returns a subset of an array", () => {
    expect(expry({ $slice: [[1, 2, 3], 1, 2] })).toEqual([2]);
    expect(expry({ $slice: [[1, 2, 3], 1, 3] })).toEqual([2, 3]);
    expect(expry({ $slice: [[1, 2, 3], 1, 0] })).toEqual([]);
    expect(expry({ $slice: [[1, 2, 3], 0, -1] })).toEqual([1, 2]);
  });
});

describe("some", () => {
  it("returns true if at least one element in an array satisfies the specified condition", () => {
    expect(
      expry({
        $some: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 2] } },
      })
    ).toBe(true);
    expect(
      expry({
        $some: { input: [1, 2, 3], as: "num", cond: { $gt: ["$$num", 3] } },
      })
    ).toBe(false);
  });
});

describe("sortArray", () => {
  it("sorts the elements of an array", () => {
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

describe("splice", () => {
  it("removes elements from an array and inserts new elements in their place", () => {
    expect(
      expry({
        $splice: {
          input: [1, 2, 3],
          start: 1,
          deleteCount: 1,
          items: [4, 5],
        },
      })
    ).toEqual([1, 4, 5, 3]);
    expect(
      expry({
        $splice: {
          input: ["a", "b", "c"],
          start: 1,
          deleteCount: 2,
          items: ["x", "y", "z"],
        },
      })
    ).toEqual(["a", "x", "y", "z"]);
  });
});

describe("unshift", () => {
  it("adds an element to the beginning of an array and returns the array", () => {
    expect(expry({ $unshift: [[1, 2], 3] })).toEqual([3, 1, 2]);
    expect(expry({ $unshift: [["a", "b"], "c"] })).toEqual(["c", "a", "b"]);
    expect(expry({ $unshift: [[], "a"] })).toEqual(["a"]);
  });
});
