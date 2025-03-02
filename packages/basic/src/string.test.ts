import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("concat", () => {
  it("concatenates strings together", () => {
    expect(expry({ $concat: ["hello", " ", "world"] })).toBe("hello world");
  });
});

describe("ltrim", () => {
  it("removes whitespace from the beginning of a string", () => {
    expect(expry({ $ltrim: "  hello " })).toBe("hello ");
  });
});

describe("rtrim", () => {
  it("removes whitespace from the end of a string", () => {
    expect(expry({ $rtrim: " hello  " })).toBe(" hello");
  });
});

describe("split", () => {
  it("divides a string into an array of substrings based on a delimiter", () => {
    expect(
      expry({
        $split: ["June-15-2013", "-"],
      })
    ).toEqual(["June", "15", "2013"]);
    expect(
      expry({
        $split: ["hello world", " "],
      })
    ).toEqual(["hello", "world"]);
  });
});

describe("strLen", () => {
  it("returns the length of a string", () => {
    expect(expry({ $strLen: "hello" })).toBe(5);
  });
});

describe("substring", () => {
  it("returns a substring of a string", () => {
    expect(expry({ $substring: ["hello", 0, 2] })).toBe("he");
    expect(expry({ $substring: ["hello", 1, 3] })).toBe("el");
  });
});

describe("toLower", () => {
  it("converts a string to lowercase", () => {
    expect(expry({ $toLower: "Hello World" })).toBe("hello world");
  });
});

describe("toUpper", () => {
  it("converts a string to uppercase", () => {
    expect(expry({ $toUpper: "Hello World" })).toBe("HELLO WORLD");
  });
});

describe("trim", () => {
  it("removes whitespace from the beginning and end of a string", () => {
    expect(expry({ $trim: "  hello  " })).toBe("hello");
  });
});
