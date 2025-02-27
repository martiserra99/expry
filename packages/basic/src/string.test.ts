import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import { basicOperations, BasicPrototypes } from "./index";

const expry = expryInstance<[BasicPrototypes]>(basicOperations);

describe("concat", () => {
  it("concatenates strings and returns the concatenated string", () => {
    expect(expry({ $concat: ["marti", " ", "serra"] })).toBe("marti serra");
  });
});

describe("ltrim", () => {
  it("removes whitespace from the beginning of a string", () => {
    expect(expry({ $ltrim: "   marti   " })).toBe("marti   ");
  });
});

describe("regexMatch", () => {
  it("performs a regular expression and returns true if there is a match", () => {
    expect(expry({ $regexMatch: ["hello", "ell"] })).toBe(true);
    expect(expry({ $regexMatch: ["goodbye", "abc"] })).toBe(false);
  });
});

describe("rtrim", () => {
  it("removes whitespace from the end of a string.", () => {
    expect(expry({ $rtrim: "   marti   " })).toBe("   marti");
  });
});

describe("split", () => {
  it("divides a string into an array of substrings based on a delimiter", () => {
    expect(expry({ $split: ["June-15-2013", "-"] })).toEqual([
      "June",
      "15",
      "2013",
    ]);
    expect(expry({ $split: ["Hello World", " "] })).toEqual(["Hello", "World"]);
  });
});

describe("strLen", () => {
  it("returns the number of characters", () => {
    expect(expry({ $strLen: "abcde" })).toBe(5);
  });
});

describe("substr", () => {
  it("returns the substring of a string", () => {
    expect(expry({ $substr: ["hello world", 1, 3] })).toBe("ell");
  });
});

describe("toLower", () => {
  it("converts a string to lowercase", () => {
    expect(expry({ $toLower: "Marti Serra" })).toBe("marti serra");
  });
});

describe("trim", () => {
  it("removes whitespace from the beginning and end of a string.", () => {
    expect(expry({ $trim: "   marti   " })).toBe("marti");
  });
});

describe("toUpper", () => {
  it("converts a string to uppercase", () => {
    expect(expry({ $toUpper: "Marti Serra" })).toBe("MARTI SERRA");
  });
});
